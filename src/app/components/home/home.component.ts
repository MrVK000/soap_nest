import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { BENEFITS, RESPONSIVE_OPTIONS, REVIEWS } from '../../data/data';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/interfaces';
import { SharedService } from '../../services/shared.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  private destroy$ = new Subject<void>();
  featuredProducts: Product[] = [];
  responsiveOptions = RESPONSIVE_OPTIONS;
  benifits = BENEFITS;
  reviews = REVIEWS;

  constructor(private api: ApiService, private router: Router, private snackbar: MatSnackBar, private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this.sharedService.addSeo("Green Glow - Handmade Soaps & Organic Shampoos");
    this.getFeaturedProducts();
  }

  getFeaturedProducts() {
    const user = this.authService.getUser();
    let customerId: string = '-';
    if ((user?.customerId) && (this.authService.isLoggedIn())) {
      customerId = user.customerId;
    }
    this.api.listProducts(customerId).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.featuredProducts = res?.data;
      if (this.featuredProducts.length == 0) {
        this.router.navigate(['/server-error']);
      }
      this.featuredProducts = this.featuredProducts.map((product: Product) => {
        product.image = "assets/content_images/" + product.image + ((product.image).slice(0, 1) === "1" ? ".webp" : ".jpg");
        return product;
      });
      this.featuredProducts = this.featuredProducts.filter((p, i) => i < 8);
    }, (err) => {
      this.snackbar.open("Couldn't fetch the products", '', { duration: 3000 });
      this.router.navigate(['/server-error']);
    });
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product-details', product.productId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
