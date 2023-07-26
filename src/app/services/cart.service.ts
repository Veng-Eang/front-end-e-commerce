import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItem:CartItem[]=[];
  constructor() { }
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();

  addToCart(theCartItem:CartItem){
    let existingCartItem=undefined;
    let alreadyExistInCart:boolean=false;
    if(this.cartItem.length>0){

      // for(let tempCartItem of this.cartItem){
      //   if(tempCartItem.id===theCartItem.id){
      //     existingCartItem=tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem=this.cartItem.find(tempCartItem=>tempCartItem.id==theCartItem.id);
      alreadyExistInCart=(existingCartItem != undefined);
    }
    if(existingCartItem != undefined){
      existingCartItem.quantity++;
    }else{
      this.cartItem.push(theCartItem);
    }
    this.computeCartTotal();
  }
  computeCartTotal() {
    let totalPriceValue:number=0.00;
    let totalQuantityValue:number=0;
    for (let currentItem of this.cartItem){
      totalPriceValue+=currentItem.quantity*currentItem.unitPrice!;
      totalQuantityValue+=currentItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
  deCrementQuantity(theCartItem: CartItem) {
      theCartItem.quantity--;
      if(theCartItem.quantity==0){
        this.remove(theCartItem)
      }else{
        this.computeCartTotal();
      }
  }
  remove(theCartItem: CartItem) {
    const itemIndex=this.cartItem.findIndex(
        tempCartItem=>tempCartItem.id===theCartItem.id
    );
    if(itemIndex>-1){
      this.cartItem.splice(itemIndex,1);
      this.computeCartTotal();
    }
  }
}
