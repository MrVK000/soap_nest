import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { Benefit } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, RouterModule, ContactComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {

  stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '100%', label: 'Natural Ingredients' },
    { number: '0', label: 'Harmful Chemicals' },
    { number: '20+', label: 'Product Varieties' },
  ];

  benefits: Benefit[] = [
    {
      label: '100% Natural',
      description: 'No harsh chemicals, no artificial fragrances — just pure goodness your skin will love.',
      image: 'assets/content_images/natural-soap-1.webp',
    },
    {
      label: 'Eco-Friendly',
      description: 'Biodegradable ingredients and sustainable packaging that are kind to our planet.',
      image: 'assets/content_images/eco-package-1.jpeg',
    },
    {
      label: 'Handmade with Love',
      description: 'Each product is carefully crafted in small batches by skilled artisans.',
      image: 'assets/content_images/handmade-soap-3.jpg',
    }
  ];

  ingredients = [
    { emoji: '🥥', name: 'Coconut Oil', benefit: 'Deep moisturising & antibacterial' },
    { emoji: '🌿', name: 'Neem Extract', benefit: 'Purifies & fights skin infections' },
    { emoji: '🌻', name: 'Turmeric', benefit: 'Brightens & reduces inflammation' },
    { emoji: '🍃', name: 'Aloe Vera', benefit: 'Soothes, hydrates & heals skin' },
    { emoji: '🌹', name: 'Rose Water', benefit: 'Tones & refreshes tired skin' },
    { emoji: '🫚', name: 'Castor Oil', benefit: 'Rich lather & deep cleansing' },
    { emoji: '🌾', name: 'Oat Extract', benefit: 'Calms sensitive & dry skin' },
    { emoji: '🍋', name: 'Lemon Peel', benefit: 'Natural exfoliant & brightener' },
  ];

  pillars = [
    { icon: 'pi pi-leaf', label: 'Zero Waste Packaging' },
    { icon: 'pi pi-globe', label: 'Sustainable Sourcing' },
    { icon: 'pi pi-heart', label: 'Cruelty Free' },
    { icon: 'pi pi-users', label: 'Community Support' },
  ];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.addSeo('About Green Glow - Our Story & Mission');
  }
}
