import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { WishlistItem } from '../../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterModule, ButtonModule, TagModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];
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
    this.sharedService.addSeo('My Wishlist - Green Glow');
    this.loadWishlist(1, false);
  }

  loadWishlist(page: number, append: boolean) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loading = true;
    this.apiService.getWishlistItemsByCustomerId(user.customerId, page).subscribe((res: any) => {
      const mapped: WishlistItem[] = (res?.data ?? []).map((item: any) => {
        try {
          const imgs = JSON.parse(item.image as string);
          item.image = imgs[0] ?? '';
        } catch { }
        return item;
      });
      this.wishlist = append ? [...this.wishlist, ...mapped] : mapped;
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
    const nearBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8;
    if (nearBottom) this.loadWishlist(this.page + 1, true);
  }

  removeFromWishlist(item: WishlistItem) {
    this.apiService.removeWishlistItem(item.id as number).subscribe((res: any) => {
      this.wishlist = this.wishlist.filter(w => w.id !== item.id);
      this.cdr.markForCheck();
      this.snackbar.open(res?.message ?? 'Removed from wishlist', '', { duration: 2000 });
    });
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }
}
