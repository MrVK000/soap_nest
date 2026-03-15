import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-shipping-and-returns',
  imports: [CommonModule, RouterModule],
  templateUrl: './shipping-and-returns.component.html',
  styleUrl: './shipping-and-returns.component.scss'
})
export class ShippingAndReturnsComponent implements OnInit {

  summaryCards = [
    { icon: 'pi pi-clock', title: 'Processing Time', desc: '1–2 business days' },
    { icon: 'pi pi-truck', title: 'Delivery Time', desc: '3–7 business days' },
    { icon: 'pi pi-map-marker', title: 'Ships To', desc: 'All across India' },
    { icon: 'pi pi-tag', title: 'Tracking', desc: 'Provided after dispatch' },
  ];

  shippingTiles = [
    { icon: 'pi pi-box', title: 'Order Processing', desc: 'Orders are processed within 1–2 business days after payment confirmation.' },
    { icon: 'pi pi-truck', title: 'Delivery Window', desc: 'Delivery takes 3–7 business days depending on your location across India.' },
    { icon: 'pi pi-map-marker', title: 'Shipping Cost', desc: 'Calculated at checkout based on your location and order size.' },
  ];

  cancellationSteps = [
    { title: 'Contact us immediately', desc: 'Reach out within 2 hours of placing your order to request a cancellation.' },
    { title: 'Order not yet processed', desc: 'Cancellations are only possible before the order is processed and dispatched.' },
    { title: 'Post-dispatch policy', desc: 'Once an order has been shipped, it cannot be cancelled under any circumstances.' },
  ];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.addSeo('Shipping & Returns - Green Glow');
  }
}
