import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-order-success',
  imports: [],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent {
  orderId: string = '';

  constructor(private router: Router, private sharedService: SharedService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.orderId = state?.['orderId'] || this.generateRandomOrderId();
  }
  ngOnInit(): void {
    this.sharedService.addSeo("Thank You for Your Order - Green Glow");
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
