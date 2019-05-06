import { Component, OnInit } from '@angular/core';
import { Cart } from '@app/_models';
import { Subject, Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CartService,BundleService,UserService,AuthenticationService } from '@app/_services';
import { ImageUtilService } from '@app/_helpers';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  currentCart: Cart;
  currentCartSubscription: Subscription;
  loading: boolean;
  _addTime: Subject<boolean> = new Subject();

  constructor(
      private cartService: CartService,
      private imageUtil: ImageUtilService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.currentCart = new Cart();
    this.currentCartSubscription = this.cartService.currentCartSubject.subscribe(ccc => {
      this.currentCart = ccc;

      try {
      if (!ccc.items){
        this.router.navigate(['/dashboard']);
      }
      }
      catch(e)
      {
        this.router.navigate(['/dashboard']);
      }

      this._addTime.pipe(debounceTime(800)).subscribe(
        value=>{
          this.loading = true;
          this.cartService.ReloadCart(this.currentCart);
         }
      );

    });

    this.loading = false;
  }

  sanitizePicture(vr)
  {
    return this.imageUtil.sanitizePicture(vr);
  }


  _qtyChange()
  {
    this._addTime.next(true);


  }
  Remove(id)
  {
    this.cartService.Delete(id);
  }
}
