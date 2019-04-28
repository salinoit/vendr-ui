import { Component, OnInit,OnDestroy, AfterViewInit } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
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
  currentUser:User;  
  currentCart:Cart;
  currentUserSubscription: Subscription;
  users: User[] = [];
  userAvatar;
  

  profilePicture(vr){        
    
    this.userAvatar= this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64," + vr);  
   
    
  }

    constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private bundleService:BundleService,
    private cartService:CartService,
    private sanitizer: DomSanitizer
  ) {

    
    this.authenticationService.currentUser.subscribe(x => {
      try {
        if (x.foto && x.foto!=''){
          this.profilePicture(x.foto);      
        }
      }
      catch {}
      this.currentUser = x;            
      
    });
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;                        
    });



    this.cartService.initialize();
    this.currentCart=this.cartService.cart;        
    this.loading = false;

  }

 

  getTotalCart()
  {
    return formatCurrency(this.currentCart.total,"pt-BR","R$ ");    
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  ngOnInit() {    
    //this.logout();
    this.bundleService.AddScript('./assets/js/main.js');
  }

  removeItemCart(id)
  {    
    this.cartService.Delete(id);
  }
  
  loading;//wait func
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
}
