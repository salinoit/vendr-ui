import { Component, OnInit } from '@angular/core';
import { PedidoService, BundleService, PagerService } from '@app/_services/';
import { Pedido, PedidoFiltro } from '@app/_models';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[];

  constructor(
    private bundleService: BundleService,
    private pedidoService: PedidoService,
    private pg: PagerService

  ) { }
   filtro: PedidoFiltro;
   // pager object
   pager: any = {};
   // paged items
   pagedItems: any[];


   changeFilter()
   {
      this.getPedidos();
   }

  ngOnInit() {

    this.pedidos = [];
    this.filtro=new PedidoFiltro();

    this.filtro.inicio='01/04/2019';
    this.filtro.fim='31/05/2019';
    this.filtro.status=0;
    this.filtro.vendedor=0;

    this.bundleService.AddScript('./assets/js/main.js');

    this.getPedidos();
  }

  getPedidos()
  {
    this.pedidoService.getFiltered(this.filtro).subscribe(p =>{
      this.pedidos = p;
      this.setPage(1);
    });
  }
  setPage(page: number){
     this.pager = this.pg.getPager(this.pedidos.length, page , 15);
     this.pagedItems = this.pedidos.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
