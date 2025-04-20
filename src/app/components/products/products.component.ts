import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { Product } from '../../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, DropdownModule, RouterModule, MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [provideAnimations()]
})
export class ProductsComponent {

  products!: Product[];

  selectedCategory: string = '';
  selectedSort: string = 'low-to-high';
  filteredProducts!: Product[];

  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  paginatedProducts: Product[] = [];

  productSortOptions = [
    {
      type: "low-to-high",
    },
    {
      type: "high-to-low",
    },
  ]

  constructor(private router: Router, private cartService: CartService, private snackBar: MatSnackBar, private api: ApiService) { }


  ngOnInit(): void {
    // this.api.getProducts().subscribe((res) => {
    //   this.products = res;
    //   console.log(">>>>> res >> ", res);

    //   this.filteredProducts = [...this.products];

    //   this.filterProducts();
    //   this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    // },
    //   (error) => {
    //     console.log("Error: ", error);
    //   })


    this.products = this.api.getProducts();
    this.filteredProducts = [...this.products];
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.filterProducts();
  }

  filterProducts() {
    this.searchQuery = this.searchQuery.trim();
    this.filteredProducts = this.products.filter(product =>
      (this.selectedCategory ? product.category === this.selectedCategory : true) && (this.searchQuery ? product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || product.price.toString().includes(this.searchQuery) : true));
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
    this.cartService.addToCart(product, 1);
    this.snackBar.open('Item added to cart', 'Close', { duration: 2000 });
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product-details', product.productId]);
    // this.router.navigate(['/product-details'], { state: { data: [product] } });
  }

  buyNow(product: Product) {
    this.router.navigate(['/checkout'], { state: { data: [product] } });
  }
}
