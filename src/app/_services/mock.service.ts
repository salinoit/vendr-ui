import { Injectable } from '@angular/core';
import { Product } from '@app/_models/product'

@Injectable({
  providedIn: 'root'
})
export class MockService {

  public PRODUCTS:Array<Product>=[
    
  ];
  
  constructor() { }
}
