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
