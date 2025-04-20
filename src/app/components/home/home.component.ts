import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { BENEFITS, RESPONSIVE_OPTIONS, REVIEWS } from '../../data/data';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/interfaces';
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  featuredProducts;
  responsiveOptions = RESPONSIVE_OPTIONS;
  benifits = BENEFITS;
  reviews = REVIEWS;

  constructor(private api: ApiService, private router: Router) {
    this.featuredProducts = api.getProducts().filter((item, i) => i < 4);
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product-details', product.productId]);
    // this.router.navigate(['/product-details'], { state: { data: [product] } });
  }
}
