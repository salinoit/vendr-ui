import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.css']
})
export class BreadcumbComponent implements OnInit {
  @Input() title:String;

  @Input() link:String;

  public getLink(){
    return this.link;
  }

  routeWithData(){
    // here route
  }

  navigate(url:String):void {    
        //this._route.navigate([url, {p1: this.property1, p2: property2 }]);
        // @RouteConfig([
        //   // ...
        //   { path: '/SecondComponent/:p1:p2', name: 'SecondComponent', component: SecondComponent} 
        // )]

        this._route.navigate([url]);
  }

  constructor(
      private _route:Router

  ) { }

  ngOnInit() {
  }

}
