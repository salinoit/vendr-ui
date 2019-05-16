import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, CartService } from '@app/_services/';
import { Location } from '@angular/common';
import { RetProduct,Product } from '@app/_models/product';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageUtilService } from '@app/_helpers';



@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
   product: Product;
   relacionados: Product[];
   total_vendido: string;
   block_reload: boolean;
   loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private imageUtil: ImageUtilService,
    private cartService: CartService

  ) {
    this.block_reload = false;
    this.relacionados = [];
    this.loading = false;
  }

  Reload(id: number)
  {
    this.getProduct(id);
  }

  PodeComprar(id: number)
  {
    try {
      var pode=this.cartService.currentCartValue.items.filter(function(e)
      {
        if (e.produto.IdProdutoServico==id) return true;
      });
      if (pode)       {
      if (pode.length>0) {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }
  catch (e)
  {
    return false;
  }
  }

  getProduct(idx: number = 0): void {
    this.loading = true;
    var id = 0;
    if (idx==0) {
      id = + this.route.snapshot.paramMap.get('id');
    }
    else
    {
      id = idx;
    }
    this.productService.getById(id)
      .subscribe(prod => {
        this.product = prod.produto;
        this.relacionados = prod.relacionados;
        this.total_vendido = prod.total_vendido.toString();
        for (let e of this.relacionados)
        {
            e.state = '0';
        }
        this.loading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getProduct();
    this.cartService.currentCartSubject.subscribe(p=>{
      if (this.block_reload==false) {
        this.getProduct();
      }
      this.block_reload=false;
    });
  }

  sanitizePicture(vr){
    return this.imageUtil.sanitizePicture(vr);
  }

  AddCart(e)
  {
    this.block_reload=true;
    if (e.state!="2") {
        e.state=1;
        this.cartService.InsertCart(e);
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

}
