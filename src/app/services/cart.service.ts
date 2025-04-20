import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: Cart[] = [
    {
      productId: "HS7683",
      category: "soap",
      id: 7,
      name: 'Coconut Soap',
      image: 'assets/content_images/coconut-soap-1.webp',
      description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
      price: 389,
      offer: 4,
      discountPrice: 373.44,
      stock: 72,
      reviews: [
        { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
      ],
      quantity: 2,
    },
    {
      productId: "HS7783",
      category: "soap",
      id: 8,
      name: 'Papaya Soap',
      image: 'assets/content_images/papaya-soap-1.webp',
      description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
      price: 559,
      offer: 2,
      discountPrice: 547.82,
      stock: 8,
      reviews: [
        { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
      ],
      quantity: 1,
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

  addToCart(product: Product, count: number) {
    let found = this.cartItems.find(item => item.productId === product.productId);
    if (found) {
      found.quantity += count;
    } else {
      this.cartItems.push({ ...product, quantity: count });
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
