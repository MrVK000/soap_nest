import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-terms-and-conditions',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent {
  constructor(public sharedService: SharedService) { }

  sections = [
    { id: 'introduction', num: '01', title: 'Introduction', icon: 'pi pi-info-circle' },
    { id: 'use-of-site', num: '02', title: 'Use of the Site', icon: 'pi pi-globe' },
    { id: 'intellectual-property', num: '03', title: 'Intellectual Property', icon: 'pi pi-shield' },
    { id: 'orders-payments', num: '04', title: 'Orders & Payments', icon: 'pi pi-credit-card' },
    { id: 'shipping-returns', num: '05', title: 'Shipping & Returns', icon: 'pi pi-truck' },
    { id: 'limitation', num: '06', title: 'Limitation of Liability', icon: 'pi pi-exclamation-triangle' },
    { id: 'changes', num: '07', title: 'Changes to Terms', icon: 'pi pi-refresh' },
    { id: 'contact', num: '08', title: 'Contact Us', icon: 'pi pi-envelope' },
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
