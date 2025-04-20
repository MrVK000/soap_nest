import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  products: Product[] = [];
  totalPrice: number = 0;
  gst: number = 0;
  deliveryCharge: number = 50;
  grandTotal: string = '';

  checkoutForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
  });

  constructor(private route: ActivatedRoute, private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['data']) {
      this.products = state['data'];
      console.log(">>>>> pro >> ", this.products);

      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.products.reduce((sum, product) => sum + product.price, 0);
    this.gst = this.totalPrice * 0.18;
    this.grandTotal = (this.totalPrice + this.gst + this.deliveryCharge).toFixed(2);
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      
      const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
      this.router.navigate(['/payment'], { state: { orderId, totalAmount: this.grandTotal } });

      // if (this.checkoutForm.value.paymentMethod === 'cod') {
      //   this.router.navigate(['/order-success'], { state: { orderId } });
      // } else {
      //   this.router.navigate(['/payment'], { state: { orderId, totalAmount: this.grandTotal } });
      // }
    }
  }

}
