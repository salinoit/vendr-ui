import { Component, OnInit } from '@angular/core';
import { Cart } from '@app/_models';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CartService,BundleService,UserService,AuthenticationService } from '@app/_services';
import { ImageUtilService } from '@app/_helpers';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  currentCart: Cart;
  currentCartSubscription: Subscription;
  loading: boolean;

  constructor(
      private cartService: CartService,
      private imageUtil: ImageUtilService
  ) { }

  ngOnInit() {
    this.currentCart = new Cart();
    this.currentCartSubscription = this.cartService.currentCart.subscribe(ccc => {
      this.currentCart = ccc;
//      this.loading=false;
    });

    this.loading = false;
  }

  sanitizePicture(vr)
  {
    return this.imageUtil.sanitizePicture(vr, '../../../assets/images/p2.jpg');
  }
  _qtyChange()
  {
    this.loading=true;
    this.cartService.ReloadCart();

    //console.log(this.cartService.currentCartValue);
  }
  Remove(id)
  {
    this.cartService.Delete(id);
  }
}
