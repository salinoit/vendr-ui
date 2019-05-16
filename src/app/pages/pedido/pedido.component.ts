import { Component, OnInit } from '@angular/core';
import { PedidoService } from '@app/_services';
import { PedidoView, PedidoItem, Pedido  } from '@app/_models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ImageUtilService } from '@app/_helpers';
@Component({
  selector: 'app-pedido',
  styleUrls: ['./pedido.component.css'],
  templateUrl: './pedido.component.html',
})
export class PedidoComponent implements OnInit {
  pedido: PedidoView;

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private location: Location,
    private imgu: ImageUtilService
  ) { }

  Print():void{
    var printContents = document.getElementById('invoice').innerHTML;
    var popupWin = window.open('', '_blank', 'width=800px,height=450px;top=0px;left=0px');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }
  ngOnInit() {
    this.pedido = new PedidoView();
    this.LoadPedido();
  }

  Voltar(): void {
    this.location.back();
  }

  LoadPedido(): void {
    var id: string =this.route.snapshot.paramMap.get('id');
    this.pedidoService.getById(id).subscribe(p=>
    {
        this.pedido = p;
        console.log(p);
    });
  }

  Sanitize(vr)
  {
    return this.imgu.sanitizePicture(vr);
  }

  N(d)
  {
    return parseInt(d);
  }
}
