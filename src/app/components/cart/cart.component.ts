import { SharedService } from './../../service/shared.service';
import { Component } from '@angular/core';
import { CART_ITEMS } from '../../data/data';
import { Product } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: Product[] = CART_ITEMS;

  filteredProducts: Product[] = [...this.cartItems];

  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.cartCount = this.cartItems.length;
  }


  paginateProducts() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.cartItems = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }



  removeFromCart(product: Product) {
    alert(`${product.name} added to cart!`);
  }

  buyNow(product: Product) {
    alert(`Buying ${product.name}`);
  }

  buyCart() {
    alert(`Buy all products in cart`);
  }

}
