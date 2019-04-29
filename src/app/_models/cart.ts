import { Product } from './product';

export class Cart {
  total: number;
  total_fmt: string;
  items: CartItem[];
}

export class CartItem {
  qtd: number;
  produto: Product;
}

export class PreloadCart
{
    existentes:PreloadCartItem[];
    novo:PreloadCartItem;
}
export class PreloadCartItem
{
    id:number;
    qtd:number;
}
