import { Component, OnInit } from '@angular/core';
import { ProductService, BundleService,PagerService,AuthenticationService } from '@app/_services';
import { Subject, Subscriber, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Vendedor } from '@app/_models';
import { Product } from '@app/_models/product'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


declare var CloseModalVendedor:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticationService:AuthenticationService,
    private pagerService: PagerService,
    private bundleService:BundleService,
    private productService:ProductService,
    private sanitizer: DomSanitizer
  ) {}
  

  currentUser:User;
  _vendedor:Vendedor=null;
  _vendedores:[];
  _search="";
  _searchTherm:Subject<string>=new Subject();
  _products:Product[];
  _products_cache:Product[];
  _currentUserSubscription: Subscription;
  loading=false;

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

 
  
  ngOnInit() {        
  this._searchTherm.pipe(debounceTime(600),distinctUntilChanged()).subscribe(
    value=>{ this._search=value; console.log('pesquisando por: ' + value); this.loadData(); }
  );
  

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;        
      this.loadData();
    });


    this.bundleService.AddScript('./assets/js/custom.js');
  }

  setPage(page: number) {    

    this.loading=true;
    this.productService.getPaged(page,this.itensPerPage,this._search).subscribe(prod=>{      
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
        var v=function()
        {
          e.state=2;
          window.clearTimeout();
        }
        window.setTimeout(v,2000);
    }
    else
    {
      e.state="0";
    }
  }

  sanitizePicture(vr){            
    return this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64," + vr);        
  }
}
