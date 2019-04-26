import { Component, OnInit } from '@angular/core';
import { ProductService, BundleService,PagerService,AuthenticationService } from '@app/_services';
import { Observable, Subscription } from 'rxjs';
import { User, Vendedor } from '@app/_models';
import { Product } from '@app/_models/product'

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
  ) {}
  

  currentUser:User;
  _vendedor:Vendedor=null;
  _vendedores:[];
  _search;
  _products:Product[];
  _products_cache:Product[];
  _currentUserSubscription: Subscription;


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





  mock()
  {
    
    // let selectVendedor: any = JSON.parse(localStorage.getItem('selectVendedor')) || null;

    // if (selectVendedor)
    // {
      
    //   this._vendedor=selectVendedor as Vendedor;        
    // }
    // else
    // {   
    //   this._vendedor=this.currentUser.vendedores[0];                  
    //   localStorage.setItem('selectVendedor', JSON.stringify(selectVendedor));
      
    // }     

    this.productService.getAll().subscribe(prod=>{      
      this._products=prod;
      this._products_cache=prod;      
      this.setPage(1);
    });

    
  }
    

  _searchInput(filterVal: any) {    
    if (filterVal == "") {
      this._products = this._products_cache;
      this.setPage(1);
    }
    else {
      this._products = this._products_cache.filter((item) => item.Descricao.toLowerCase().indexOf(filterVal.toLowerCase())>=0);
      if (this._products)
      {
        this.setPage(1);
      }
    }
  }

  
  ngOnInit() {        
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;        
      this.mock();            
    });


    this.bundleService.AddScript('./assets/js/custom.js');
  }

  setPage(page: number) {    
    // get pager object from service
    this.pager = this.pagerService.getPager(this._products.length, page , this.itensPerPage);
    // get current page of items
    this.pagedItems = this._products.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  loadData()
  {
    //pega o vendedor atual e os filtros e pega os dados    
    this.setPage(this.pager.actualPage);
  }
}
