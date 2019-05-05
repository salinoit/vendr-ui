import { Component, OnInit,OnDestroy, AfterViewInit } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { ImageUtilService } from '@app/_helpers/image-util.service';
import { formatCurrency  } from '@angular/common';
import { CartService,BundleService,UserService,AuthenticationService } from '@app/_services';
import { Cart,User } from '@app/_models';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  NavigationStart, NavigationCancel, NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-inside-layout',
  templateUrl: './inside-layout.component.html',
  styleUrls: ['./inside-layout.component.css'],

})

export class InsideLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: User;
  currentCart: Cart;
  currentUserSubscription: Subscription;
  currentCartSubscription: Subscription;
  loading: boolean;
  users: User[] = [];
  userAvatar;


  profilePicture(vr)
  {
    if (vr) {
      var gh='';
      if(vr.indexOf('data:image')<0)
      {
          gh='data:image/png;base64,';
      }
      this.userAvatar = this.sanitizer.bypassSecurityTrustUrl(gh + vr);
    } else
    {
       this.userAvatar = '../../../assets/images/user.png';
    }
  }


    constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private bundleService: BundleService,
    private cartService: CartService,
    private sanitizer: DomSanitizer,
    private imageUtil: ImageUtilService,
  ) {




    this.authenticationService.currentUser.subscribe(x => {
      if (x) {
      this.profilePicture(x.foto);
      this.currentUser = x;
      }
    });

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.currentCartSubscription = this.cartService.currentCart.subscribe(ccc => {
      this.currentCart = ccc;
    });

    this.loading = false;

  }



  getTotalCart()
  {
    if (this.currentCart) {
      return this.currentCart.total_fmt;
    } else {
      return 'R$ 0,00';
    }
  }
  logout() {
    localStorage.clear();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  ngOnInit() {
    this.bundleService.AddScript('./assets/js/main.js');
  }

  removeItemCart(id)
  {
    this.cartService.Delete(id);
  }

  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
            if(event instanceof NavigationStart) {
                this.loading = true;

            }
            else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel
                ) {

                this.loading = false;
            }
        });
}

sanitizePicture(vr){
   return this.imageUtil.sanitizePicture(vr);
}
}
