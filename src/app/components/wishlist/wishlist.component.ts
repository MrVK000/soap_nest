import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WishlistItem } from '../../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
      return;
    }
    this.apiService.getWishlistItemsByCustomerId(user.customerId).subscribe((res: any) => {
      this.wishlist = res.data;
      this.wishlist = this.wishlist.map((wishlist: WishlistItem, i: number) => {
        wishlist.image = "assets/content_images/" + wishlist.image + ((wishlist.image).slice(0, 1) === "1" ? ".webp" : ".jpg");
        return wishlist;
      });
    });
  }

  removeFromWishlist(wishlistItem: WishlistItem) {
    this.apiService.removeWishlistItem(wishlistItem.id as number).subscribe((res: any) => {
      this.loadWishlist();
      this.snackbar.open(res?.message, '', { duration: 2000 });
    });
  }
}
