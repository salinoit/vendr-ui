import { Component, OnInit } from '@angular/core';
import { BundleService } from '@app/_services/bundle.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(
    private bundleService: BundleService

  ) { }

  ngOnInit() {
    this.bundleService.AddScript('./assets/js/main.js');
  }

}
