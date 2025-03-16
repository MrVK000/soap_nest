import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product = {
    id: 1,
    name: 'Organic Aloe Vera Soap',
    image: 'assets/content_images/coconut-soap-1.webp',
    description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
    price: 9.99,
    discountPrice: 7.99,
    stock: 10,
    reviews: [
      { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
      { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' }
    ]
  };

  quantity = 1;

  increaseQuantity() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    alert(`${this.product.name} added to cart!`);
  }

  buyNow() {
    alert(`Proceeding to checkout with ${this.quantity} ${this.product.name}.`);
  }
}
