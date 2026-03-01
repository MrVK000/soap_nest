import { SharedService } from './../../services/shared.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FavoriteItemPayload, Product } from '../../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, DropdownModule, RouterModule, MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [provideAnimations()]
})
export class ProductsComponent {
  private destroy$ = new Subject<void>();
  products: Product[] = [];
  selectedCategory: string = '';
  selectedSort: string = 'low-to-high';
  filteredProducts!: Product[];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 12;
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

  constructor(private router: Router, private cartService: CartService, private snackbar: MatSnackBar, private api: ApiService, public sharedService: SharedService, private authService: AuthService) { }

  ngOnInit(): void {
    this.sharedService.addSeo("Shop Products - Green Glow");
    const user = this.authService.getUser();
    let customerId: string = '-';
    if ((user?.customerId) && (this.authService.isLoggedIn())) {
      customerId = user.customerId;
    }
    this.api.listProducts(customerId).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.products = res?.data;

      if (this.products.length == 0) {
        this.router.navigate(['/server-error']);
      }
      this.products = this.products.map((product: Product, i: number) => {
        product.image = "assets/content_images/" + product.image + ((product.image).slice(0, 1) === "1" ? ".webp" : ".jpg");
        return product;
      });
      this.filteredProducts = [...this.products];

      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      this.filterProducts();
    }, () => {
      this.snackbar.open("Couldn't fetch the products", '', { duration: 3000 });
      this.router.navigate(['/server-error']);
    });
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

  addToCart(productId: string) {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.snackbar.open("Please Login First", '', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(user.customerId, productId);
  }

  addOrRemoveFavorites(productId: string, favoriteId: number, type: boolean) {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.snackbar.open("Please Login First", '', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    if (type) {
      this.api.removeFavoritesItem(favoriteId).subscribe((res: any) => {
        this.snackbar.open(res?.message, '', { duration: 2000 });
      });
    } else {
      const addFavoritePayload: FavoriteItemPayload = {
        customerId: user.customerId,
        productId: productId
      }
      this.api.addToFavorites(addFavoritePayload).subscribe((res: any) => {
        this.paginatedProducts.filter(product => {
          if (product.favoriteItemId === favoriteId) {
            product.isFavoriteItem = true;
          }
        })
        this.snackbar.open(res?.message, '', { duration: 2000 });
      });
    }
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }

  buyNow(product: Product) {
    this.router.navigate(['/checkout'], { state: { data: [product] } });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
