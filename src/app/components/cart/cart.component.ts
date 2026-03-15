import { SharedService } from '../../services/shared.service';
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, ButtonModule, TagModule, DividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(private router: Router, public sharedService: SharedService, public cartService: CartService) { }

  ngOnInit(): void {
    this.sharedService.addSeo('Your Cart - Green Glow');
    this.cartService.loadCartItems(1, false);
    this.cartService.loadCartSummary();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.cartService.cartLoading) return;
    if (this.cartService.cartPage >= this.cartService.cartTotalPages) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (nearBottom) {
      this.cartService.loadCartItems(this.cartService.cartPage + 1, true);
    }
  }

  increaseQuantity(cartItemId: number, quantity: number) {
    this.cartService.increaseQuantity(cartItemId, quantity + 1);
  }

  decreaseQuantity(cartItemId: number, quantity: number) {
    this.cartService.decreaseQuantity(cartItemId, quantity - 1);
  }

  removeItem(cartItemId: number) {
    this.cartService.removeItem(cartItemId);
  }

  goToCheckout() {
    this.router.navigate(['/checkout'], { state: { data: this.cartService.cartItems } });
  }
}
