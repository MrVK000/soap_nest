import { SharedService } from './../../services/shared.service';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { FavoriteItemPayload, Product } from '../../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule, SelectModule, InputTextModule, IconFieldModule, InputIconModule, RouterModule, MatSnackBarModule, ButtonModule, CheckboxModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [provideAnimations()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  products: Product[] = [];
  selectedCategory: string = '';
  selectedMaxPrice: number | null = null;
  priceOptions = [
    { label: 'Below ₹200', value: 200 },
    { label: 'Below ₹400', value: 400 },
    { label: 'Below ₹600', value: 600 },
    { label: 'Below ₹800', value: 800 },
    { label: 'Below ₹1000', value: 1000 },
    { label: 'Below ₹2000', value: 2000 },
  ];
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  isLoading: boolean = false;
  hasMore: boolean = true;
  priceDropdownOpen: boolean = false;
  private isReady: boolean = false;
  private customerId: string = '-';

  categoryOptions = [
    { label: 'All Categories', value: '' },
    { label: 'Soaps', value: 'soap' },
    { label: 'Shampoos', value: 'shampoo' },
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
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.resetAndLoad());
    this.loadProducts();
  }

  resetAndLoad() {
    this.currentPage = 1;
    this.products = [];
    this.hasMore = true;
    this.isReady = false;
    this.loadProducts();
  }

  loadProducts(append: boolean = false) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.cdr.markForCheck();

    const filters = {
      search: this.searchQuery,
      category: this.selectedCategory,
      minPrice: undefined,
      maxPrice: this.selectedMaxPrice ?? undefined
    };

    this.api.listProducts(this.customerId, this.currentPage, filters).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      const fetched = (res?.data ?? []).map((product: any) => ({
        ...product,
        image: product.images?.[0] ?? ''
      }));
      this.totalPages = res?.totalPages ?? 1;
      this.totalCount = res?.total ?? 0;
      this.products = append ? [...this.products, ...fetched] : fetched;
      this.hasMore = this.currentPage < this.totalPages;
      this.isLoading = false;
      this.isReady = true;
      this.cdr.markForCheck();
    }, () => {
      this.isLoading = false;
      this.snackbar.open("Couldn't fetch the products", '', { duration: 3000, panelClass: ['custom-snackbar'] });
      this.cdr.markForCheck();
    });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  onCategoryChange() {
    this.resetAndLoad();
  }

  onPriceChange(value: number) {
    this.selectedMaxPrice = this.selectedMaxPrice === value ? null : value;
    this.priceDropdownOpen = false;
    this.resetAndLoad();
  }

  clearPriceFilter() {
    this.selectedMaxPrice = null;
    this.priceDropdownOpen = false;
    this.resetAndLoad();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.price-select-wrap')) {
      this.priceDropdownOpen = false;
      this.cdr.markForCheck();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isReady || this.isLoading || !this.hasMore) return;
    const scrolled = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight * 0.8;
    if (scrolled >= threshold) {
      this.currentPage++;
      this.loadProducts(true);
    }
  }

  addToCart(productId: string) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.snackbar.open("Please Login First", '', { duration: 3000, panelClass: ['custom-snackbar'] });
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(user.customerId, productId);
  }

  addOrRemoveFavorites(productId: string, favoriteId: number, type: boolean) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.snackbar.open("Please Login First", '', { duration: 3000, panelClass: ['custom-snackbar'] });
      this.router.navigate(['/login']);
      return;
    }
    if (type) {
      this.api.removeFavoritesItem(favoriteId).subscribe((res: any) => {
        this.products = this.products.map(p => p.productId === productId ? { ...p, isFavoriteItem: false, favoriteItemId: 0 } : p);
        this.cdr.markForCheck();
        this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
      });
    } else {
      this.api.addToFavorites({ customerId: this.customerId, productId }).subscribe((res: any) => {
        this.products = this.products.map(p => p.productId === productId ? { ...p, isFavoriteItem: true, favoriteItemId: res?.data?.id } : p);
        this.cdr.markForCheck();
        this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
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
