import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  orders: Order[] = [
    {
      orderId: 'ORD123456',
      date: '2025-03-15',
      totalAmount: 899,
      paymentMethod: 'Online',
      status: 'Delivered'
    },
    {
      orderId: 'ORD789012',
      date: '2025-03-10',
      totalAmount: 459,
      paymentMethod: 'COD',
      status: 'Shipped'
    },
    {
      orderId: 'ORD789012',
      date: '2025-03-10',
      totalAmount: 459,
      paymentMethod: 'COD',
      status: 'Cancelled'
    },
    {
      orderId: 'ORD789012',
      date: '2025-03-10',
      totalAmount: 459,
      paymentMethod: 'COD',
      status: 'Pending'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    // this.orderService.getOrderHistory().subscribe(
    //   (response) => {
    //     this.orders = response;
    //   },
    //   (error) => {
    //     console.error('Error fetching order history:', error);
    //   }
    // );
  }

  viewOrder(orderId: string) {
    this.router.navigate(['/order-details'], { state: { orderId } });
  }

}
