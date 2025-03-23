import { CommonModule } from '@angular/common';
import { Benefit } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, ContactComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  benefits: Benefit[] = [
    {
      label: '100% Natural',
      description: 'No harsh chemicals, no artificial fragrances.',
      image: 'assets/content_images/natural-soap-1.webp',
    },
    {
      label: 'Eco-Friendly',
      description: 'Biodegradable ingredients & sustainable packaging.',
      image: 'assets/content_images/eco-package-1.jpeg',
    },
    {
      label: 'Handmade with Love',
      description: 'Each product is carefully crafted by artisans.',
      image: 'assets/content_images/handmade-soap-3.jpg',
    }
  ];
}
