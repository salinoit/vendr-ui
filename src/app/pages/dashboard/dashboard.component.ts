import { Component, OnInit } from '@angular/core';
import { VendedorService, CartService, ProductService, BundleService,PagerService,AuthenticationService } from '@app/_services';
import { ImageUtilService } from '@app/_helpers';
import { Subject, Subscriber, Observable, Subscription } from 'rxjs';

import { Product, ProductPage, User, Vendedor } from '@app/_models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



declare var CloseModalVendedor: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private pagerService: PagerService,
    private bundleService: BundleService,
    private productService: ProductService,
    private imageUtil: ImageUtilService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private location: Location,
    private vendedorService: VendedorService,
    private router: Router
  ) {}

  currentUser: User;
  _vendedor: Vendedor = null;
  _vendedores: [];
  _search = '';
  _searchTherm: Subject<string> = new Subject();
  _products: ProductPage;
  _currentUserSubscription: Subscription;
  _vendedorLido = false;
  loading = false;




  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  _itensPerPage=[
    {id:15,name:'15 Itens por Página'},
    {id:30,name:'30 Itens por Página'},
    {id:45,name:'45 Itens por Página'},
  ];
  _itensPerPageChange($event)
  {

    this.loadData();
  }
  itensPerPage=15;


  _itensOrder=[
    {id:1,name:'Preço: Menor para Maior'},
    {id:2,name:'Preço: Maior para Menor'},
  ]
  _itensOrderChange($event)
  {
    this.loadData();
  }
  itensOrder=1;


  _filterBy=[
    {id:0,name:'Filtrar por...'},
    {id:1,name:'Novos Itens'},
    {id:2,name:'Mais Vendidos'},
    {id:3,name:'Já Comprados'},
    {id:4,name:'Favoritos'},
  ]
  _filterByChange($event)
  {
    this.loadData();
  }
  filterBy=0;

  _sellerChange(vr)
  {
    //CHANGE
    // let selectVendedor=this.currentUser.vendedores.filter(item => item.id==vr);
    // if (selectVendedor)
    // {
    //   this._vendedor=selectVendedor[0];
    //   localStorage.setItem('selectVendedor', JSON.stringify(this._vendedor));
    // }
    // CloseModalVendedor();

    this.loadData();

  }




  _searchInput(filterVal: any) {
    this._searchTherm.next(filterVal);
  }
  _idvendedor: string;
  initializeVendedor(): void { //apenas para exibir os detalhes do vendedor
    if (parseInt(this._idvendedor)>0) {
    this.vendedorService.getById(parseInt(this._idvendedor))
    .subscribe(vend => {
      this._vendedor = vend;
      //console.log(vend);
      this._vendedorLido=true;
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     if (params['id']) {
       const id = params['id'];
       this._idvendedor=id;

       localStorage.setItem('vendedor',id);

       this.router.navigate(['/dashboard']);
       this.initializeVendedor();
     }
     else
     {
       var id=localStorage.getItem('vendedor');

       if (id) {
        this._idvendedor=id;
        //console.log('captei:' + id);
       }
       else
       {
         this._idvendedor="0";
       }
       this.initializeVendedor();
     }
     this.loadData();
    });


    this._searchTherm.pipe(debounceTime(1200),distinctUntilChanged()).subscribe(
      value=>{ this._search=value; console.log('pesquisando por: ' + value); this.loadData(); }
    );


  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  this._currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

    });


    this.bundleService.AddScript('./assets/js/custom.js');
  }

  setPage(page: number) {

    var vend=0;
    if (parseInt(this._idvendedor)>0) {
      vend=parseInt(this._idvendedor);
    }

    this.loading=true;
    this.productService.getPaged(page,this.itensPerPage,this._search,vend,this.itensOrder).subscribe(prod=>{
      this._products=prod;
      this.loading=false;
      // get pager object from service
      this.pager = this.pagerService.getPager(prod.total, page , this.itensPerPage);
      // get current page of items
      this.pagedItems = prod.items;

      //adiciona no array a coluna state, para controlar a animação do botao quando adicionar
      //ao carrinho
      this.pagedItems = this.pagedItems.map(function(ad) {
        ad.state = "0";
        return ad;
      });
      // // get pager object from service
      // this.pager = this.pagerService.getPager(this._products.length, page , this.itensPerPage);
      // // get current page of items
      // this.pagedItems = this._products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    });
  }

  loadData(page:number=1)
  {
    if (this.pager.actualPage) {
       //pega o vendedor atual e os filtros e pega os dados
       this.setPage(this.pager.actualPage);
    }
    else
    {
      this.setPage(1);
    }
  }

  AddCart(e)
  {
    if (e.state!="2") {
        e.state=1;
        this.cartService.InsertCart({id:e.IdProdutoServico,qtd:1})
        var v=function()
        {
          e.state=2;
          window.clearTimeout();
        }
        window.setTimeout(v,2000);
    } else
    {
      e.state="0";
    }
  }

  clearFilter()
  {
    this._search='';
    this._searchTherm.next('');
  }
  sanitizePicture(vr){
    return this.imageUtil.sanitizePicture(vr);
  }
}
