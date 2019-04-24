import { Component, OnInit, Renderer2, Inject } from '@angular/core';

import * as $ from 'jquery';


import { DOCUMENT } from '@angular/platform-browser';
//  import { DOCUMENT } from '@angular/common';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  clicou():void{
    
  }

  title = 'ui';

  
  // 2. pass then in constructor
  //constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    
  //}
  
    // 3. call them in ngOnInit - using onload for dependencies
  ngOnInit() {
    // const s = this.renderer2.createElement('script');
    // s.onload = this.loadNextScript.bind(this);
    // s.type = 'text/javascript';
    // s.src = './third/js/bootstrap.bundle.js'; // Defines someGlobalObject
    // s.text = ``;
    
    // this.renderer2.appendChild(this._document.body, s);
  }
 
  loadNextScript() {
    // const s = this.renderer2.createElement('script');
    // s.text = `
    // This would error, if previous script has not yet been loaded
    //   someGlobalObject.doSomething();
    // `
    // this.renderer2.appendChild(this._document.body, s);
  }
}
