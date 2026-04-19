import { Injectable } from '@angular/core';
import { WishlistItem, WishlistItemPayload } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

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

  addToWishlist(productId: string, customerId: string) {
    const wishlistPayload: WishlistItemPayload = {
      customerId,
      productId
    }
    this.apiService.addToWishlist(wishlistPayload).subscribe((res: any) => {
      this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  removeFromWishlist(id: number) {
    this.apiService.removeWishlistItem(id).subscribe((res: any) => {
      this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }
}
