import { SharedService } from './../../services/shared.service';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { FavoriteItemPayload, Product } from '../../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, SelectModule, InputTextModule, IconFieldModule, InputIconModule, RouterModule, MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [provideAnimations()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  private destroy$ = new Subject<void>();
  products: Product[] = [];
  selectedCategory: string = '';
  selectedSort: string = 'low-to-high';
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;
  hasMore: boolean = true;
  private customerId: string = '-';

  categoryOptions = [
    { label: 'All Categories', value: '' },
    { label: 'Soaps', value: 'Soap' },
    { label: 'Shampoos', value: 'Shampoo' },
  ];

  sortOptions = [
    { label: 'Price: Low to High', value: 'low-to-high' },
    { label: 'Price: High to Low', value: 'high-to-low' },
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private snackbar: MatSnackBar,
    private api: ApiService,
    public sharedService: SharedService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sharedService.addSeo("Shop Products - Green Glow");
    const user = this.authService.getUser();
    if (user?.customerId && this.authService.isLoggedIn()) {
      this.customerId = user.customerId;
    }
    this.loadProducts();
  }

  loadProducts(append: boolean = false) {
    if (this.isLoading || (!append && this.currentPage > 1)) return;
    this.isLoading = true;
    this.cdr.markForCheck();

    this.api.listProducts(this.customerId, this.currentPage).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      const fetched = (res?.data ?? []).map((product: any) => ({
        ...product,
        image: environment.serverUrl + product.images[0]
      }));
      this.totalPages = res?.totalPages ?? 1;
      this.products = append ? [...this.products, ...fetched] : fetched;
      this.hasMore = this.currentPage < this.totalPages;
      this.isLoading = false;
      this.applyClientFilters();
      this.cdr.markForCheck();
    }, () => {
      this.isLoading = false;
      this.snackbar.open("Couldn't fetch the products", '', { duration: 3000 });
      this.cdr.markForCheck();
    });
  }

  applyClientFilters() { }

  get displayedProducts(): Product[] {
    let result = [...this.products];
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.price.toString().includes(q));
    }
    result.sort((a, b) => this.selectedSort === 'low-to-high' ? a.price - b.price : b.price - a.price);
    return result;
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isLoading || !this.hasMore) return;
    const scrolled = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 300;
    if (scrolled >= threshold) {
      this.currentPage++;
      this.loadProducts(true);
    }
  }

  filterProducts() {
    this.cdr.markForCheck();
  }

  searchProducts() {
    this.cdr.markForCheck();
  }

  sortProducts() {
    this.cdr.markForCheck();
  }

  addToCart(productId: string) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.snackbar.open("Please Login First", '', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(user.customerId, productId);
  }

  addOrRemoveFavorites(productId: string, favoriteId: number, type: boolean) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.snackbar.open("Please Login First", '', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }
    if (type) {
      this.api.removeFavoritesItem(favoriteId).subscribe((res: any) => {
        this.products = this.products.map(p => p.productId === productId ? { ...p, isFavoriteItem: false, favoriteItemId: 0 } : p);
        this.cdr.markForCheck();
        this.snackbar.open(res?.message, '', { duration: 2000 });
      });
    } else {
      this.api.addToFavorites({ customerId: user.customerId, productId }).subscribe((res: any) => {
        this.products = this.products.map(p => p.productId === productId ? { ...p, isFavoriteItem: true, favoriteItemId: res?.data?.id } : p);
        this.cdr.markForCheck();
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
