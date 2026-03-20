import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FavoriteItem } from '../../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, RouterModule, ButtonModule, TagModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteItem[] = [];
  loading = false;
  page = 1;
  totalPages = 1;
  private isReady = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public sharedService: SharedService,
    private snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sharedService.addSeo('My Favorites - Green Glow');
    this.loadFavorites(1, false);
  }

  loadFavorites(page: number, append: boolean) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loading = true;
    this.apiService.getFavoritesItemsByCustomerId(user.customerId, page).subscribe((res: any) => {
      const mapped: FavoriteItem[] = (res?.data ?? []).map((item: any) => {
        try {
          const imgs = JSON.parse(item.image as string);
          item.image = environment.serverUrl + imgs[0];
        } catch { }
        return item;
      });
      this.favorites = append ? [...this.favorites, ...mapped] : mapped;
      this.page = res?.page ?? page;
      this.totalPages = res?.totalPages ?? 1;
      this.loading = false;
      this.isReady = true;
      this.cdr.markForCheck();
    }, () => { this.loading = false; this.cdr.markForCheck(); });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isReady || this.loading || this.page >= this.totalPages) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (nearBottom) this.loadFavorites(this.page + 1, true);
  }

  removeFromFavorites(item: FavoriteItem) {
    this.apiService.removeFavoritesItem(item.id as number).subscribe((res: any) => {
      this.favorites = this.favorites.filter(f => f.id !== item.id);
      this.cdr.markForCheck();
      this.snackbar.open(res?.message ?? 'Removed from favorites', '', { duration: 2000 });
    });
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }
}
