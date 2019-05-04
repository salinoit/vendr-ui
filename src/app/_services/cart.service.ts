import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Product } from '@app/_models/product';
import { Cart, CartItem, PreloadCart, PreloadCartItem } from '@app/_models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
   private sendData: Observable<PreloadCart>;
   private sendDataSubject: BehaviorSubject<PreloadCart>;

   currentCart: Observable<Cart>;
   private currentCartSubject: BehaviorSubject<Cart>;

   constructor(
     private http: HttpClient
    ) {
      this.sendDataSubject = new BehaviorSubject<PreloadCart>(JSON.parse(localStorage.getItem('Cart')));
      this.sendData = this.sendDataSubject.asObservable();

      this.currentCartSubject = new BehaviorSubject<Cart>(JSON.parse(localStorage.getItem('CartFix!')));
      this.currentCart = this.currentCartSubject.asObservable();

      this.sendData.subscribe(sd => {
        this.ProcessServerCart(sd);
       });

       //this.sendDataSubject.subscribe(p=>console.log(p));
   }

   ProcessServerCart(sr: PreloadCart) {
    if (sr) {

      this.http.post<Cart>(`${environment.apiUrl}/cart/`, sr).subscribe(carr=>{
        this.currentCartSubject.next(carr);
        const newState = new PreloadCart();
        newState.existentes = [];
        newState.novo = new PreloadCartItem();

        for (var i of carr.items){
          newState.existentes.push({id:i.produto.IdProdutoServico,qtd:i.qtd});
        }
        localStorage.setItem('Cart', JSON.stringify(newState));
      });
    }
  }

  public get currentCartValue(): Cart {
  return this.currentCartSubject.value;
  }
  public get currentPreloadValue(): PreloadCart {
  return this.sendDataSubject.value;
  }

  ReloadCart()
  {
    const c = new PreloadCart();
    c.existentes = [];
    for (let n of this.currentCartValue.items)
    {
        c.existentes.push({id:n.produto.IdProdutoServico,qtd:n.qtd});
    }
    this.ProcessServerCart(c);
  }
  Delete(id)
  {
    let carr = JSON.parse(localStorage.getItem('Cart')) as PreloadCart;
    let index=0;
    for (let x of carr.existentes)
    {
      if (x.id==id)
      {
        break;
      }
      index++;
    }

    carr.existentes.splice(index,1);
    this.sendDataSubject.next(carr);

  }

  public Clear(): void
  {

  }
  public InsertCart(novo: PreloadCartItem): void {

			if (localStorage.getItem('Cart') == null) {
          //do nothing
          let cartn=new PreloadCart();
          cartn.existentes=[];
          cartn.novo = novo;
          this.sendDataSubject.next(cartn);
				} else {
          let carr = JSON.parse(localStorage.getItem('Cart')) as PreloadCart;
          carr.novo = novo;
          this.sendDataSubject.next(carr);
          //this.ProcessServerCart(carr);
        }
    }
}

