import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { NAV_LINKS } from '../../data/data';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartService } from '../../services/cart.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Suggestion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatTooltipModule, MatMenuModule, InputIconModule, IconFieldModule, InputTextModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private destroy$ = new Subject<void>();
  navLinks = NAV_LINKS;
  isSidebarOpen = false;
  items = [
    {
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out'
        }
      ]
    }
  ];

  searchTerm = '';
  suggestions: Suggestion[] = [];
  showSuggestions = false;
  private searchSubject = new Subject<string>();
  placeholderText = 'Search products';
  private currentWordIndex = 0;
  private typingInterval: any;
  private deleting = false;
  private charIndex = 0;
  private timeoutRef: any;
  private placeholderWords: string[] = [];

  constructor(public cartService: CartService, private router: Router, public authService: AuthService, private apiService: ApiService) {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged(), switchMap(term => apiService.fetchSuggestions(term))).subscribe(res => {
      this.suggestions = res.data;

      this.showSuggestions = !!this.searchTerm.trim() && res.data.length > 0;
    });
  }

  ngOnInit(): void {
    this.apiService.fetchPlaceholderWords().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.placeholderWords = res.data;
      this.startTypingEffect();
    })
    this.cartService.calculateCartCount();
  }


  startTypingEffect() {
    const currentWord = this.placeholderWords[this.currentWordIndex];
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const pauseAfterTyping = 1500;
    const pauseAfterErasing = 500;

    if (!this.deleting && this.charIndex <= currentWord.length) {
      // typing
      this.placeholderText = currentWord.substring(0, this.charIndex);
      this.charIndex++;
      this.timeoutRef = setTimeout(() => this.startTypingEffect(), typingSpeed);

    } else if (this.deleting && this.charIndex >= 0) {
      // erasing
      this.placeholderText = currentWord.substring(0, this.charIndex);
      this.charIndex--;
      this.timeoutRef = setTimeout(() => this.startTypingEffect(), erasingSpeed);

    } else {
      // switch states
      if (!this.deleting) {
        this.deleting = true;
        this.timeoutRef = setTimeout(() => this.startTypingEffect(), pauseAfterTyping);
      } else {
        this.deleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % this.placeholderWords.length;
        this.timeoutRef = setTimeout(() => this.startTypingEffect(), pauseAfterErasing);
      }
    }
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
    clearInterval(this.typingInterval);
    clearInterval(this.timeoutRef);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
