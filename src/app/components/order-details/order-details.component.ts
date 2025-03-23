import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  order: OrderDetails | null = null;
  orderId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    // Get the orderId from the route params
    // this.route.paramMap.subscribe(params => {
    //   this.orderId = params.get('orderId');
    //   if (this.orderId) {
    //     this.fetchOrderDetails(this.orderId);
    //   }
    // });
    this.order = {
      "orderId": "ORD123456",
      "date": "2025-03-21",
      "totalAmount": 878,
      "paymentMethod": "Online Payment",
      "status": "Shipped",
      "deliveryAddress": "John Doe, 123 Green Street, Chennai, India - 600001",
      "items": [
        {
          "name": "Neem Soap",
          "quantity": 1,
          "price": 329
        },
        {
          "name": "Lemon Soap",
          "quantity": 1,
          "price": 549
        },
        {
          "name": "Neem Soap",
          "quantity": 1,
          "price": 329
        },
        {
          "name": "Lemon Soap",
          "quantity": 1,
          "price": 549
        },
      ]
    }

  }

  // fetchOrderDetails(orderId: string) {
  //   this.orderService.getOrderById(orderId).subscribe(
  //     (response) => {
  //       this.order = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching order details:', error);
  //     }
  //   );
  // }

  goBack() {
    this.router.navigate(['/my-orders']);
  }
}
