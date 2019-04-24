import { Component, OnInit,OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT, } from '@angular/common';
import { Router } from '@angular/router';
import { UserService,AuthenticationService } from '@app/_services';
import { User } from '../../_models';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { TopSearchComponent } from '../../_components/top-search/top-search.component';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit,OnDestroy {
  currentUser: User;

  currentUserSubscription: Subscription;
  users: User[] = [];


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document
  ) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
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
  const s = this.renderer2.createElement('script');
    s.src='./assets/js/main.js';
    this.renderer2.appendChild(this._document.body, s);      
  }
}
