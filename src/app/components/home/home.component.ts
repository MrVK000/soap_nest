import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  featuredProducts = [
    { id: 1, name: 'Neam Soap', price: 249, image: 'assets/content_images/neam-soap - 1.webp' },
    { id: 2, name: 'Aloe Vera Shampoo', price: 449, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    // { id: 2, name: 'Aloe Vera Shampoo', price: 7.49, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 3, name: 'Coconut Soap', price: 349, image: 'assets/content_images/coconut-soap - 1.jpg' }
  ];

  // D:\project\angular\shopify\public\content_images\aloe-vera-shampoo-1.jpg

  // public\content_images\aloe-vera-shampoo-1.jpg

  benifits = [
    {
      label: '100% Natural',
      description: 'No chemicals, no artificial fragrances.',
      image: 'assets/content_images/natural-soap-1.webp',
    },
    {
      label: 'Eco-Friendly',
      description: 'Biodegradable & sustainable packaging.',
      image: 'assets/content_images/eco-package-1.jpeg',
    },
    {
      label: 'Handmade with Love',
      description: 'Crafted in small batches for quality.',
      image: 'assets/content_images/handmade-soap-3.jpg',
    },
  ];

  reviews = [
    { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    { name: 'Sam', text: 'Such an incredeble product. It fixed my hair. I really loved it.' },
    { name: 'Richie', text: 'Must try the coconut soap. Now a days my skin blows much better' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
  ];



  responsiveOptions = [

    {
        breakpoint: '6400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '5200px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '5200px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '4600px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '3200px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '2500px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1900px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]












}
