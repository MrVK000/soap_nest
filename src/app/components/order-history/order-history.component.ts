import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  private destroy$ = new Subject<void>();
  orders: Order[] = [];
  constructor(private router: Router, private api: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
      return;
    }
    this.api.getOrdersByCustomerId(user.customerId).pipe(takeUntil(this.destroy$)).subscribe((res) => {
    })
  }

  viewOrder(orderId: string) {
    this.router.navigate(['/order-details'], { state: { orderId } });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
