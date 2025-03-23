import { Injectable } from '@angular/core';
import { CART_ITEMS } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = CART_ITEMS;

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any) {
    let found = this.cartItems.find(item => item.productId === product.productId);
    if (found) {
      found.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.cartItems.splice(index, 1);
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price - (item.price * item.offer / 100)) * item.quantity, 0);
  }
}
