import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, CartItemPayload, Product } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: CartItem[] = [];

  private cartCount = new BehaviorSubject(0);
  // cartCount = new Subject<number>();

  constructor(private router: Router, private api: ApiService, private snackbar: MatSnackBar, private authService: AuthService) {
    this.calculateCartCount();
  }

  getCartItems() {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
      return;
    }
    this.api.getCartItemsByCustomerId(user.customerId).subscribe((res: any) => {
      this.cartItems = res?.data?.map((cartItem: CartItem) => {
        cartItem.image = "assets/content_images/" + cartItem.image + ((cartItem.image).slice(0, 1) === "1" ? ".webp" : ".jpg");
        return cartItem;
      });
      this.calculateCartCount();
    }, (err) => {
      if ((err?.error?.error) === "Invalid or expired token.") {
        this.router.navigate(['/login']);
      }
    })
  }

  calculateCartCount() {
    this.cartCount.next(this.cartItems.length);
  }

  addToCart(customerId: string, productId: string) {
    const cartItemPayload: CartItemPayload = {
      customerId,
      productId,
      quantity: 1
    };
    this.api.addToCart(cartItemPayload).subscribe((res) => {
      this.getCartItems();
      this.calculateCartCount();
      this.snackbar.open('Item added to cart', '', { duration: 2000 });
    });
  }

  increaseQuantity(cartItemId: number, quantity: number) {
    const cartItemPayload: CartItemPayload = {
      cartItemId,
      quantity
    };
    this.api.updateCartItem(cartItemPayload).subscribe((res) => {
      this.calculateCartCount();
      this.getCartItems();
      this.snackbar.open('Item updated successfully', '', { duration: 2000 });
    }, (err) => {
      this.snackbar.open(err?.errors[0].msg, '', { duration: 2000 });
    });
  }

  decreaseQuantity(cartItemId: number, quantity: number) {
    if (quantity < 1) {
      this.snackbar.open('Quantity must be at least 1', '', { duration: 2000 });
      return;
    }
    const cartItemPayload: CartItemPayload = {
      cartItemId,
      quantity
    };
    this.api.updateCartItem(cartItemPayload).subscribe((res) => {
      this.calculateCartCount();
      this.getCartItems();
      this.snackbar.open('Item updated successfully', '', { duration: 2000 });
    }, (err) => {
      this.snackbar.open(err?.error.errors[0].msg, '', { duration: 2000 });
    });
  }

  removeItem(cartItemId: number) {
    this.api.removeCartItem(cartItemId.toString()).subscribe((res) => {
      this.calculateCartCount();
      this.getCartItems();
      this.snackbar.open('Item updated successfully', '', { duration: 2000 });
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price - (item.price * item.offer / 100)) * item.quantity, 0);
  }


  get getCartCount(): number {
    return this.cartCount.getValue();
  }


  resetCartCount() {
    this.cartCount.next(0);
  }
}
