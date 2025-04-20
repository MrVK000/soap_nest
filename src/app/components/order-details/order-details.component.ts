// import { html2pdf } from 'html2pdf.js';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

declare var html2pdf: any;

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  // order: OrderDetails | null = null;
  // orderId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router,) { }

  // ngOnInit(): void {
  //   // Get the orderId from the route params
  //   // this.route.paramMap.subscribe(params => {
  //   //   this.orderId = params.get('orderId');
  //   //   if (this.orderId) {
  //   //     this.fetchOrderDetails(this.orderId);
  //   //   }
  //   // });
  //   this.order = {
  //     "orderId": "ORD123456",
  //     "date": "2025-03-21",
  //     "totalAmount": 878,
  //     "paymentMethod": "Online Payment",
  //     "status": "Shipped",
  //     "deliveryAddress": "John Doe, 123 Green Street, Sydhapet,  Chennai, India - 600001",
  //     "items": [
  //       {
  //         "name": "Neem Soap",
  //         "quantity": 1,
  //         "price": 329
  //       },
  //       {
  //         "name": "Lemon Soap",
  //         "quantity": 1,
  //         "price": 549
  //       },
  //       {
  //         "name": "Neem Soap",
  //         "quantity": 1,
  //         "price": 329
  //       },
  //       {
  //         "name": "Lemon Soap",
  //         "quantity": 1,
  //         "price": 549
  //       },
  //     ]
  //   }

  // }

  // // fetchOrderDetails(orderId: string) {
  // //   this.orderService.getOrderById(orderId).subscribe(
  // //     (response) => {
  // //       this.order = response;
  // //     },
  // //     (error) => {
  // //       console.error('Error fetching order details:', error);
  // //     }
  // //   );
  // // }

  goBack() {
    this.router.navigate(['/my-orders']);
  }


  order: any;
  company = {
    name: 'Green Glow',
    address: '123 Green Street, Bangalore, India',
    phone: '+91 9876543210',
    email: 'support@greenglow.com',
    support: '+91 9876543210'
  };

  ngOnInit() {
    this.fetchOrderDetails();
  }

  fetchOrderDetails() {
    this.order = {
      orderId: 'ORD987654',
      date: new Date(),
      status: "Shipped",
      customer: {
        name: 'Rahul Mehta',
        address: 'A-45, Green Lane, Pune',
        phone: '+91 9988776655',
        email: 'rahul@example.com'
      },
      items: [
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 },
      ],
      subtotal: 1207,
      taxRate: 5,
      taxAmount: 60.35,
      deliveryCharge: 50,
      totalAmount: 1317.35
    };
  }


  downloadInvoicePDF() {
    const element = document.getElementById('invoice');
    if (element) {
      const options = {
        margin: 10,
        filename: `${this.order.orderId}-invoice.pdf`,
        html2canvas: {
          scale: 2,
          logging: true,
          useCORS: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };
      html2pdf().from(element).set(options).save();
    }
  }

  // downloadInvoicePDF() {
  //   const element = document.getElementById('invoice');
  //   if (element) {
  //     const options = {
  //       margin: 10,
  //       filename: `${this.order.orderId}-invoice.pdf`,
  //       html2canvas: {
  //         scale: 2,
  //         logging: true,
  //         useCORS: true
  //       },
  //       jsPDF: {
  //         unit: 'mm',
  //         format: 'a4',
  //         orientation: 'portrait'
  //       }
  //     };
  //     html2pdf().from(element).set(options).save();
  //   }
  // }












}
