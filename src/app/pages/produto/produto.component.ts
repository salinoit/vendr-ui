import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@app/_services/product.service';
import { Location } from '@angular/common';
import { Product } from '@app/_models/product';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageUtilService } from '@app/_helpers';



@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  @Input() _product:Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private imageUtil: ImageUtilService

  ) { }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getById(id)
      .subscribe(prod => this._product = prod);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getProduct();
  }

  sanitizePicture(vr){
    return this.imageUtil.sanitizePicture(vr);
  }

}
