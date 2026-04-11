import { ApiService } from './../../services/api.service';
import { Component, ViewChild } from '@angular/core';
import { NAV_LINKS } from '../../data/data';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PopoverModule } from 'primeng/popover';
import { BadgeModule } from 'primeng/badge';
import { Popover } from 'primeng/popover';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Suggestion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, InputIconModule, IconFieldModule, InputTextModule, FormsModule, ButtonModule, DrawerModule, PopoverModule, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('profilePopover') profilePopover!: Popover;
  private destroy$ = new Subject<void>();
  navLinks = NAV_LINKS;
  isSidebarOpen = false;

  searchTerm = '';
  suggestions: Suggestion[] = [];
  showSuggestions = false;
  private searchSubject = new Subject<string>();
  placeholderWords: string[] = [];
  slideIndex = 0;
  searchFocused = false;
  private intervalRef: any;

  constructor(public cartService: CartService, private router: Router, public authService: AuthService, private apiService: ApiService) {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged(), switchMap(term => apiService.fetchSuggestions(term))).subscribe(res => {
      this.suggestions = res.data;
      this.showSuggestions = !!this.searchTerm.trim() && res.data.length > 0;
    });
  }

  ngOnInit(): void {
    this.apiService.fetchPlaceholderWords().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.placeholderWords = res.data;
      this.startSlideEffect();
    });
  }

  startSlideEffect() {
    this.intervalRef = setInterval(() => {
      if (this.slideIndex === this.placeholderWords.length) {
        // already on clone, silently reset to real index 0
        this.slideTransition = false;
        this.slideIndex = 0;
        setTimeout(() => {
          this.slideTransition = true;
          this.slideIndex = 1;
        }, 50);
      } else {
        this.slideIndex++;
      }
    }, 5000);
  }

  slideTransition = true;

  get slideTransform(): string {
    return `translateY(-${this.slideIndex * 24}px)`;
  }

  onSearchFocus() {
    this.searchFocused = true;
    clearInterval(this.intervalRef);
    this.showSuggestions = true;
  }

  onSearchBlur() {
    if (!this.searchTerm) {
      this.searchFocused = false;
      this.startSlideEffect();
    }
    this.hideSuggestions();
  }

  onSearchChange() {
    const trimmed = this.searchTerm.trim();

    this.searchSubject.next(trimmed);
  }

  selectSuggestion(item: Suggestion) {
    this.searchTerm = item.name;
    this.suggestions = [];
    this.showSuggestions = false;
    this.viewProductDetails(item.productId);
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }

  hideSuggestions() {
    setTimeout(() => {
      if (!this.searchTerm.trim()) {
        this.suggestions = [];
      }
      this.showSuggestions = false;
    }, 200);
  }

  windowReload(): void {
    window.location.reload();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
