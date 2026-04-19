import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartItemPayload, CartSummary, CartSummaryItem } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: CartItem[] = [];
  public cartPage = 1;
  public cartTotalPages = 1;
  public cartLoading = false;
  public summaryItems: CartSummaryItem[] = [];
  public summary: CartSummary = { subtotal: 0, totalSavings: 0, total: 0, itemCount: 0 };
  public summaryLoading = false;

  private cartCount = new BehaviorSubject(0);

  constructor(private router: Router, private api: ApiService, private snackbar: MatSnackBar, private authService: AuthService) {
    this.fetchCartCount();
  }

  fetchCartCount() {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) return;
    this.api.getCartCount(user.customerId).subscribe((res) => {
      this.cartCount.next(res?.count ?? 0);
    }, () => { });
  }

  loadCartItems(page: number = 1, append: boolean = false, onReady?: () => void) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartLoading = true;
    this.api.getCartItemsByCustomerId(user.customerId, page).subscribe((res: any) => {
      const mapped: CartItem[] = (res?.data ?? []).map((cartItem: CartItem) => {
        try {
          const imgs = JSON.parse(cartItem.image as string);
          cartItem.image = imgs[0] ?? '';
        } catch { }
        return cartItem;
      });
      this.cartItems = append ? [...this.cartItems, ...mapped] : mapped;
      this.cartPage = res?.page ?? page;
      this.cartTotalPages = res?.totalPages ?? 1;
      this.cartLoading = false;
      this.calculateCartCount();
      onReady?.();
    }, (err) => {
      this.cartLoading = false;
      if (err?.error?.error === 'Invalid or expired token.') {
        this.router.navigate(['/login']);
      }
    });
  }

  loadCartSummary() {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) return;
    this.summaryLoading = true;
    this.api.getCartSummary(user.customerId).subscribe((res) => {
      this.summary = res.summary;
      this.summaryItems = res.items.map(item => {
        try {
          const imgs = JSON.parse(item.image as string);
          item.image = imgs[0] ?? '';
        } catch { }
        return item;
      });
      this.summaryLoading = false;
    }, () => { this.summaryLoading = false; });
  }

  // Keep for backward compat (header badge etc.)
  getCartItems() {
    this.loadCartItems(1, false);
    this.loadCartSummary();
  }

  calculateCartCount() {
    this.cartCount.next(this.cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }

  addToCart(customerId: string, productId: string) {
    const cartItemPayload: CartItemPayload = { customerId, productId, quantity: 1 };
    this.api.addToCart(cartItemPayload).subscribe(() => {
      this.loadCartItems(1, false);
      this.loadCartSummary();
      this.fetchCartCount();
      this.snackbar.open('Item added to cart', '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  increaseQuantity(cartItemId: number, quantity: number) {
    this.api.updateCartItem({ cartItemId, quantity }).subscribe(() => {
      this.loadCartItems(1, false);
      this.loadCartSummary();
      this.fetchCartCount();
      this.snackbar.open('Item updated successfully', '', { duration: 2000, panelClass: ['custom-snackbar'] });
    }, (err) => {
      this.snackbar.open(err?.errors?.[0]?.msg, '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  decreaseQuantity(cartItemId: number, quantity: number) {
    if (quantity < 1) {
      this.snackbar.open('Quantity must be at least 1', '', { duration: 2000, panelClass: ['custom-snackbar'] });
      return;
    }
    this.api.updateCartItem({ cartItemId, quantity }).subscribe(() => {
      this.loadCartItems(1, false);
      this.loadCartSummary();
      this.fetchCartCount();
      this.snackbar.open('Item updated successfully', '', { duration: 2000, panelClass: ['custom-snackbar'] });
    }, (err) => {
      this.snackbar.open(err?.error?.errors?.[0]?.msg, '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  removeItem(cartItemId: number) {
    this.api.removeCartItem(cartItemId.toString()).subscribe(() => {
      this.loadCartItems(1, false);
      this.loadCartSummary();
      this.fetchCartCount();
      this.snackbar.open('Item removed', '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (+item.discountPrice) * item.quantity, 0);
  }

  get getCartCount(): number {
    return this.cartCount.getValue();
  }

  resetCartCount() {
    this.cartCount.next(0);
  }
}
