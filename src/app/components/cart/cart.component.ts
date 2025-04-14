import { SharedService } from '../../services/shared.service';
import { Component } from '@angular/core';
import { Cart, Product } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Cart[] = [];

  filteredProducts: Cart[] = [...this.cartItems];

  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

  // ngOnInit(): void {
  //   this.sharedService.cartCount = this.cartItems.length;
  // }


  constructor(private router: Router, private sharedService: SharedService, private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();

  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice().toFixed(2);
  }
}
