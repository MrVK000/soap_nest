import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-order-success',
  imports: [CommonModule, ButtonModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent implements OnInit {
  orderId: string = '';

  steps = [
    { icon: 'pi pi-check-circle', label: 'Order Confirmed' },
    { icon: 'pi pi-box',          label: 'Being Packed' },
    { icon: 'pi pi-truck',        label: 'Out for Delivery' },
    { icon: 'pi pi-home',         label: 'Delivered' },
  ];

  constructor(private router: Router, private sharedService: SharedService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.orderId = state?.['orderId'] || this.generateRandomOrderId();
  }

  ngOnInit(): void {
    this.sharedService.addSeo('Order Placed Successfully - Green Glow');
  }

  generateRandomOrderId(): string {
    return 'ORD' + Math.floor(100000 + Math.random() * 900000);
  }

  goToHome() {
    this.router.navigate(['/products']);
  }

  goToOrders() {
    this.router.navigate(['/my-orders']);
  }
}
