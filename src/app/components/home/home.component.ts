import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { BENEFITS, RESPONSIVE_OPTIONS } from '../../data/data';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  private destroy$ = new Subject<void>();
  featuredProducts: any[] = [];
  responsiveOptions = RESPONSIVE_OPTIONS;
  benifits = BENEFITS;
  reviews: any[] = [];

  constructor(private api: ApiService, private router: Router, private snackbar: MatSnackBar, private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.addSeo("Green Glow - Handmade Soaps & Organic Shampoos");
    this.getFeaturedProducts();
    this.getTopReviews();
  }

  getFeaturedProducts() {
    this.api.getPublicFeaturedProducts().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.featuredProducts = (res?.data ?? []).map((product: any) => ({
        ...product,
        image: environment.serverUrl + product.images[0]
      }));
    }, () => {
      this.snackbar.open("Couldn't fetch the products", '', { duration: 3000 });
    });
  }

  getTopReviews() {
    this.api.getTopReviews().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.reviews = res?.data ?? [];
    });
  }

  viewProduct(product: any) {
    this.router.navigate(['/product-details', product.productId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
