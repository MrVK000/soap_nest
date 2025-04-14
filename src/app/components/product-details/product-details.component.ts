import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ReactiveFormsModule, RatingModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  // product: Product = {
  //   productId: "JDG34K",
  //   category: "soap",
  //   id: 1,
  //   name: 'Organic Aloe Vera Soap',
  //   image: 'assets/content_images/coconut-soap-1.webp',
  //   description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
  //   price: 9.99,
  //   discountPrice: 7.99,
  //   stock: 10,
  //   reviews: [
  //     // { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
  //     // { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
  //     // { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
  //     // { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
  //   ]
  // };

  product!: Product;

  quantity = 1;
  showAddReviewModal: boolean = false;

  reviewForm: FormGroup;

  constructor(private router: Router, private cartService: CartService, private snackBar: MatSnackBar, private fb: FormBuilder) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    console.log(">>>>> router >> ", state);
    if (state && state['data']) {
      this.product = state['data'][0];

      // this.calculateTotal();
    }


    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [0, Validators.required],
    });
  }


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
    this.cartService.addToCart(this.product);
    this.snackBar.open('Item added to cart', 'Close', { duration: 2000 });
  }

  buyNow() {
    console.log(">>>>> prod >> ", this.product);
    this.router.navigate(['/checkout'], { state: { data: [this.product] } });
  }

  saveComment() {
    console.log(">>>>> rev >> ", this.reviewForm.value);
    if (this.reviewForm.valid) {
      console.log("Product Data:", this.reviewForm.value);
      this.snackBar.open('Comment Added Successfully', 'Close', { duration: 2000 });
      // Here, we will call the API to save the product later
      this.closeAddReviewModal();
    } else {
      this.snackBar.open('Please fill all the fields', 'Close', { duration: 2000 });
    }
  }


  closeAddReviewModal() {
    this.showAddReviewModal = false;
    this.reviewForm.reset();
  }

}
