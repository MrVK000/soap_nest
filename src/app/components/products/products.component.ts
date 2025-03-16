import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { PRODUCTS } from '../../data/data';
import { Product } from '../../interfaces/interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, DropdownModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [provideAnimations()]
})
export class ProductsComponent {

  products: Product[] = PRODUCTS;

  selectedCategory: string = '';
  selectedSort: string = 'low-to-high';
  filteredProducts: Product[] = [...this.products];

  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  paginatedProducts: Product[] = [];

  productSortOptions = [
    {
      type: "low-to-high",
    },
    {
      type: "high-to-low",
    },
  ]


  constructor() {
    this.filterProducts();
  }

  filterProducts() {
    this.searchQuery = this.searchQuery.trim();
    this.filteredProducts = this.products.filter(product =>
      (this.selectedCategory ? product.category === this.selectedCategory : true) &&
      (this.searchQuery ?
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.price.toString().includes(this.searchQuery)  // Search by price
        : true)
    );
    this.sortProducts();
  }

  searchProducts() {
    this.filterProducts();
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) =>
      this.selectedSort === 'low-to-high' ? a.price - b.price : b.price - a.price
    );
    this.paginateProducts();
  }

  paginateProducts() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
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


  addToCart(product: Product) {
    alert(`${product.name} added to cart!`);
  }

  buyNow(product: Product) {
    alert(`${product.name} added to cart!`);
  }
}
