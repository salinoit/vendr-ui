import { EventEmitter, Injectable, APP_INITIALIZER } from '@angular/core';
import { Product } from '@app/_models/product';
import { Cart, CartItem,  } from '@app/_models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
   //OnChange: EventEmitter<bool>=new EventEmitter();

   private currentCart: Cart;

   currentCartSubject: BehaviorSubject<Cart>;

   inProcess: boolean;

   buffer: Product[];

   public get currentCartValue(): Cart {
    return this.currentCartSubject.value;
  }

   constructor(
     private http: HttpClient
    ) {
      this.buffer = [];
      this.inProcess = false;

      this.currentCartSubject = new BehaviorSubject<Cart>(JSON.parse(localStorage.getItem('currentCart')) as Cart);
      //this.currentCart = this.currentCartSubject.asObservable();
      //this.currentCartSubject = new BehaviorSubject<Cart>(new Cart());
      this.currentCartSubject.subscribe(p => {
        if (p == null) {
          p = new Cart();
          p.total=0;
          p.items=[];
        }

        this.currentCart = p;
      });
   }

   SendToServer()
   {


     if (this.buffer.length > 0){
        this.inProcess =  true;

        const p = this.buffer[0];

        var novoItem = new CartItem();
          novoItem.qtd = 1;
          novoItem.produto = p;

        var localCart = JSON.parse(localStorage.getItem('currentCart')) as Cart;
        if (localCart)
        {
          localCart.items.push(novoItem);
        } else
        {
          localCart = new Cart();
          localCart.total = 0;
          localCart.items = [];
          localCart.items.push(novoItem);
        }

        this.http.post<Cart>(`${environment.apiUrl}/cart/`, localCart).subscribe(carr=>{
          this.buffer.splice(0,1);
          this.currentCartSubject.next(carr);
          localStorage.setItem('currentCart', JSON.stringify(carr));
          if (this.buffer.length > 0)
          {
            this.SendToServer();
          } else
          {
            this.inProcess = false;
          }
        });

    }
  }



  ReloadCart(cart: Cart)
  {
    this.http.post<Cart>(`${environment.apiUrl}/cart/`, cart).subscribe(carr=>{
      this.currentCartSubject.next(carr);
      localStorage.setItem('currentCart', JSON.stringify(carr));
    });
  }

  Delete(id)
  {
    let carr = JSON.parse(localStorage.getItem('currentCart')) as Cart;
    let index=0;
    for (let x of carr.items)
    {
      if (x.produto.IdProdutoServico == id)
      {
        break;
      }
      index++;
    }
    carr.items.splice(index,1);
    this.ReloadCart(carr);
  }

  public Clear(): void
  {    
    localStorage.removeItem('currentCart');
    this.currentCartSubject.next(new Cart());    
  }

  public InsertCart(product: Product): void {
    this.buffer.push(product);
    if (this.inProcess == false)
    {
        this.inProcess = true;
        this.SendToServer();
    }
  }
  }
