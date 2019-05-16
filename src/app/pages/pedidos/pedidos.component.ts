import { Component, OnInit } from '@angular/core';
import { AuthenticationService, PedidoService, BundleService, PagerService } from '@app/_services/';
import { User, Pedido, PedidoFiltro } from '@app/_models';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[];
  currentUser: User;
  loading: boolean;

  constructor(
    private bundleService: BundleService,
    private pedidoService: PedidoService,
    private pg: PagerService,
    private auth: AuthenticationService

  ) { }
   filtro: PedidoFiltro;
   // pager object
   pager: any = {};
   // paged items
   pagedItems: any[];


   changeFilter()
   {
      this.filtro.inicio=$('#date1').val().toString();
      this.filtro.fim=$('#date2').val().toString();
      var sel=$('#slestatus > option:selected').val();
      this.filtro.status=sel as number;
      this.getPedidos();
   }


  ngOnInit() {
    this.loading = false;
    
    var lastday = function(y,m){
      return  new Date(y, m +1, 0).getDate();
    }

    var xs = new Date().toISOString().substr(0,10).split('-');
    var ini='01/' + xs[1] + '/' + xs[0];
    var fi= lastday(xs[0],new Date().getMonth()) + '/' + xs[1] + '/' +xs[0];


    this.filtro=new PedidoFiltro();
    this.filtro.inicio=ini;
    this.filtro.fim=fi;
    this.filtro.status=0;
    this.filtro.vendedor=0;
    this.filtro.consumidor=0;

    this.auth.currentUser.subscribe(x => {
      this.currentUser = x;
      this.filtro.consumidor=x.id_consumidor;
    });

   


    this.pedidos = [];
    
    this.bundleService.AddScript('./assets/js/main.js');

    this.getPedidos();
  }

  getPedidos()
  {
    this.loading = true;
    this.pedidoService.getFiltered(this.filtro).subscribe(p =>{
      this.pedidos = p;
      this.setPage(1);
      this.loading = false;
    });
  }
  setPage(page: number){
     this.pager = this.pg.getPager(this.pedidos.length, page , 15);
     this.pagedItems = this.pedidos.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
