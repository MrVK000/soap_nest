import { AuthService } from './../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { Component } from '@angular/core';
import { Product } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(private router: Router, public sharedService: SharedService, public cartService: CartService) { }

  ngOnInit(): void {
    this.sharedService.addSeo("Your Cart - Green Glow");
    this.cartService.getCartItems();
  }


  increaseQuantity(cartItemId: number, quantity: number) {
    this.cartService.increaseQuantity(cartItemId, quantity + 1);
  }

  decreaseQuantity(cartItemId: number, quantity: number) {
    this.cartService.decreaseQuantity(cartItemId, quantity - 1);
  }

  removeItem(cartItem: number) {
    this.cartService.removeItem(cartItem);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice().toFixed(2);
  }

  goToCheckout() {
    this.router.navigate(['/checkout'], { state: { data: this.cartService.cartItems } });
  }
}
