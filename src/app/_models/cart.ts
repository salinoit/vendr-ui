export class Cart {
    public total:number;
    public items:Array<CartItem>;
}

export class CartItem {
    productId:Number;
    title:String;
    avatar:String;
    qtd:number;
    vr:number;
}