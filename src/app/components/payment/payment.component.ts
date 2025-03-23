import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  orderId: string = '';
  totalAmount: number = 0;

  razorpayKey = 'YOUR_RAZORPAY_KEY_ID'; // Replace with your actual Razorpay Key ID

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.orderId = state?.['orderId'] || 'N/A';
    this.totalAmount = state?.['totalAmount'] || 0;
  }


  ngOnInit() {
    this.loadRazorpayScript();
  }

  loadRazorpayScript() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.defer = true;
    document.body.appendChild(script);
  }


  completePayment() {
    const options = {
      key: this.razorpayKey,
      amount: this.totalAmount * 100, // Convert to paise
      currency: 'INR',
      name: 'Eco-Friendly Store',
      description: `Order #${this.orderId}`,
      handler: (response: any) => {
        console.log('Payment Successful', response);
        this.router.navigate(['/order-success'], { state: { orderId: this.orderId } });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }


  cancelPayment() {
    this.router.navigate(['/checkout'], { state: { totalAmount: this.totalAmount } });
  }

}
