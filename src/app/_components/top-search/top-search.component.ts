import { Component, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';


@Component({
  selector: '.searchBox',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent implements OnInit {

  heroes$: Observable<String[]>;
  
  private searchTerms = new Subject<string>();
  
  // Push a search term into the observable stream.
  search(term: string): void {    
    this.searchTerms.next(term);
  }

  frutas:String[]=['abacate','melao','melancia','kiwi'];
  list:string[]=[];

  searchTest(f:string):Observable<String[]>
  {    
      if (f){
        return of(this.frutas.filter((element) => element.indexOf(f)>-1));
      }
      else{
        return of([]);
      }
  }

  m:String[]=['abacate','mamao','melancia','kiwi'];

  constructor() { }

  setX(x:any):void 
  {
    var pi:string[]=x;        
    this.list=pi;       
    console.log('Observer got a next value: ' + pi)
  }

  myObserver = {
    next: x => this.setX(x),      
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  

  ngOnInit(): void {    
        this.heroes$ = this.searchTerms.pipe(
          // wait 300ms after each keystroke before considering the term
          debounceTime(300),

          // ignore new term if same as previous term
          distinctUntilChanged(),

          // switch to new search observable each time the term changes
          switchMap((term: string) => this.searchTest(term) ),
          // switchMap((term: string) => this.heroService.searchHeroes(term)),
        );    
        this.heroes$.subscribe(this.myObserver);    
        // this.heroes$.subscribe((data) => {
        //   this.list=data;
        //   console.log("Subscriber got data >>>>> "+ data);
        // });
  }

}