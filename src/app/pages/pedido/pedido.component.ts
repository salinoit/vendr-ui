import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
})
export class PedidoComponent implements OnInit {

  constructor() { }
  
  Print():void{
    var printContents = document.getElementById('invoice').innerHTML;
    var popupWin = window.open('', '_blank', 'width=800px,height=450px;top=0px;left=0px');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }
  ngOnInit() {
  }

}
