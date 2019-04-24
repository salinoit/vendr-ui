import { Injectable } from '@angular/core';
import { Product } from '@app/_models/product'

@Injectable({
  providedIn: 'root'
})
export class MockService {

  public PRODUCTS:Array<Product>=[
    {id:1,title:'Produto 1',avatar:'p1.jpg',vr:128.12},
    {id:2,title:'Produto 2',avatar:'p2.jpg',vr:136.20},
    {id:3,title:'Produto 3',avatar:'p3.jpg',vr:1020.00},
    {id:4,title:'Produto 4',avatar:'p4.jpg',vr:600.00},
    {id:5,title:'Produto 5',avatar:'p5.jpg',vr:350.00},
    {id:6,title:'Produto 6',avatar:'p6.jpg',vr:86.00},
    {id:7,title:'Produto 7',avatar:'p7.jpg',vr:35.50},
    {id:8,title:'Produto 8',avatar:'p8.jpg',vr:120.00},
  ];
  
  constructor() { }
}
