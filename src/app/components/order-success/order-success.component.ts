import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent {
  orderId: string = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.orderId = state?.['orderId'] || this.generateRandomOrderId();
  }

  generateRandomOrderId(): string {
    return 'ORD' + Math.floor(100000 + Math.random() * 900000);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToOrders() {
    this.router.navigate(['/my-orders']);
  }
}
