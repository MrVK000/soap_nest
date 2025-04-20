import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PRODUCTS } from '../../data/data';
import { ApiService } from '../../services/api.service';
import { appConfig } from '../../app.config';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService, private snackBar: MatSnackBar, private fb: FormBuilder, private api: ApiService) {
    this.product = this.fetchProductDetail(this.activatedRoute.snapshot.paramMap.get('id'));

    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [0, Validators.required],
    });
  }

  fetchProductDetail(productId: string | null): Product {
    if (productId) {
      return this.api.getProducts().find((product) => product.productId == productId) as Product;
    }
    return {
      id: 0,
      name: "empty",
      category: "empty",
      price: 0,
      offer: 0,
      image: "empty",
      productId: "empty",
      description: "empty",
      discountPrice: 0,
      stock: 0,
      reviews: [],
    };
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
    this.cartService.addToCart(this.product, this.quantity);
    this.snackBar.open('Item added to cart', 'Close', { duration: 2000 });
  }

  buyNow() {
    // console.log(">>>>> prod >> ", this.product);
    this.router.navigate(['/checkout'], { state: { data: [this.product] } });
  }

  saveComment() {
    if (this.reviewForm.valid) {
      PRODUCTS.forEach((product) => {
        if (product.id === this.product.id)
          product.reviews.push({ ...this.reviewForm.value, user: "added_user" });
      });
      this.product = this.fetchProductDetail(this.activatedRoute.snapshot.paramMap.get('id'));
      // console.log("Product Data:", this.reviewForm.value);
      this.snackBar.open('Comment Added Successfully', 'Close', { duration: 2000 });
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
