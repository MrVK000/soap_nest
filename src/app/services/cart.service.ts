import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: any[] = [
    {
      productId: "HS7K83",
      name: "Neem Soap",
      category: "soap",
      price: 329,
      offer: 10, // 10% off
      quantity: 2,
      image: "assets/content_images/neem-soap-1.webp"
    },
    {
      productId: "TX2B19",
      name: "Lemon Soap",
      category: "soap",
      price: 549,
      offer: 14, // 14% off
      quantity: 1,
      image: "assets/content_images/turmeric-soap-1.webp"
    },
    {
      productId: "HS7K83",
      name: "Neem Soap",
      category: "soap",
      price: 329,
      offer: 10, // 10% off
      quantity: 2,
      image: "assets/content_images/neem-soap-1.webp"
    },
    {
      productId: "TX2B19",
      name: "Lemon Soap",
      category: "soap",
      price: 549,
      offer: 14, // 14% off
      quantity: 1,
      image: "assets/content_images/turmeric-soap-1.webp"
    },
    {
      productId: "HS7K83",
      name: "Neem Soap",
      category: "soap",
      price: 329,
      offer: 10, // 10% off
      quantity: 2,
      image: "assets/content_images/neem-soap-1.webp"
    },
    {
      productId: "TX2B19",
      name: "Lemon Soap",
      category: "soap",
      price: 549,
      offer: 14, // 14% off
      quantity: 1,
      image: "assets/content_images/turmeric-soap-1.webp"
    },
  ];

  cartCount = new BehaviorSubject(0);

  constructor() {
    this.cartCount.next(this.cartItems.length);
  }

  getCartItems() {
    return this.cartItems;
  }

  calculateCartCount() {
    this.cartCount.next(this.cartItems.length);
  }

  addToCart(product: any) {
    let found = this.cartItems.find(item => item.productId === product.productId);
    if (found) {
      found.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.calculateCartCount();
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.calculateCartCount();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.cartItems.splice(index, 1);
    }
    this.calculateCartCount();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateCartCount();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price - (item.price * item.offer / 100)) * item.quantity, 0);
  }
}
