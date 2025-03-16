import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { BENEFITS, FEATURED_PRODUCTS, RESPONSIVE_OPTIONS, REVIEWS } from '../../data/data';
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  featuredProducts = FEATURED_PRODUCTS;
  responsiveOptions = RESPONSIVE_OPTIONS;
  benifits = BENEFITS;
  reviews = REVIEWS;
}
