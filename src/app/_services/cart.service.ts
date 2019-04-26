import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Product } from "@app/_models/product";
import { Cart, CartItem } from "@app/_models/cart";


@Injectable({
  providedIn: 'root'
})
export class CartService {
   cart:Cart;
   /***************************** */


   items:Array<CartItem>=[
    {productId:1,title:'Produto 1',avatar:'capro1.jpg',vr:128.12,qtd:1},
    {productId:2,title:'Produto 2',avatar:'capro2.jpg',vr:136.20,qtd:1},
    {productId:3,title:'Produto 3',avatar:'capro1.jpg',vr:1020.00,qtd:1}
  ]

  Recalc()
  {
    this.cart.total=0;
    var conteudo=this.cart.items; 

    for (let x=0;x<conteudo.length;x++)
    {
      var v1=conteudo[x].vr;
      var v2=conteudo[x].qtd;
      this.cart.total += (v1*v2);           
    }
  }
  
  Delete(id:number): boolean{

    
    
    var index=this.cart.items.findIndex(item=>item.productId==id);                

    if (index>=0)
    {
      this.cart.items.splice(index, 1);
       
      this.Recalc();

      return true;
    }
    else
    {
      return false;
    }
    
  }

  public initialize():void {    
				if (localStorage.getItem('cart') == null) {                    
    
          this.cart=new Cart();
          this.cart.total=0;
          this.cart.items=new Array<CartItem>();
    
          for (let x=0;x<this.items.length;x++) {                                    
            this.cart.items.push((this.items[x]));
          }          

          localStorage.setItem('cart', JSON.stringify(this.cart));
          
				} else {
          this.cart = JSON.parse(localStorage.getItem('cart')) as Cart;										          
        }        				

        this.Recalc();
    };      
}

