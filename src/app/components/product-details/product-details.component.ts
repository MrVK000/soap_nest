import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { Product, Review, WishlistItemPayload } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ReactiveFormsModule, RatingModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
}) export class ProductDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  product: Product = {} as Product;
  productId!: string;
  quantity = 1;
  showAddReviewModal: boolean = false;
  reviewForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService, private snackbar: MatSnackBar, private fb: FormBuilder, private apiService: ApiService, public sharedService: SharedService, private authService: AuthService) {
    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const newProductId = params.get('id');
      if (!newProductId) {
        this.router.navigate(['/products']);
        return;
      }
      this.productId = newProductId;
      this.updateProduct();
    });
  }

  updateProduct() {
    const user = this.authService.getUser();
    const customerId: string = (user && user.customerId) ? user.customerId : "-";
    this.apiService.getProductById(this.productId, customerId).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.product = res.data;
      this.sharedService.addSeo(`${this.product.name} - Buy Now | Green Glow`);
      this.product.image = "assets/content_images/" + this.product.image +
        ((this.product.image).slice(0, 1) === "1" ? ".webp" : ".jpg");
    }, () => {
      this.router.navigate(['/products']);
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
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(user.customerId, this.product.productId);
    this.snackbar.open('Item added to cart', '', { duration: 2000 });
  }

  addToWishlist() {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
      return;
    }

    const wishlistPayload: WishlistItemPayload = {
      customerId: user.customerId,
      productId: this.product.productId
    }

    this.apiService.addToWishlist(wishlistPayload).subscribe((res: any) => {
      this.updateProduct();
      this.snackbar.open(res?.message, '', { duration: 2000 });
    });
  }

  removeFromWishlist() {
    this.apiService.removeWishlistItem(this.product.wishlistItemId).subscribe((res: any) => {
      this.updateProduct();
      this.snackbar.open(res?.message, '', { duration: 2000 });
    });
  }

  // addToWishlist(productId: string, customerId: string) {
  //   const wishlistPayload: WishlistItemPayload = {
  //     customerId,
  //     productId
  //   }
  //   this.apiService.addToWishlist(wishlistPayload).subscribe((res: any) => {
  //     this.snackbar.open(res?.message, '', { duration: 2000 });
  //   });
  // }

  // removeFromWishlist(id: number) {
  //   this.apiService.removeWishlistItem(id).subscribe((res: any) => {
  //     this.snackbar.open(res?.message, '', { duration: 2000 });
  //   });
  // }

  buyNow() {
    this.router.navigate(['/checkout'], { state: { data: [this.product] } });
  }

  saveComment() {
    if (this.reviewForm.valid) {
      const reviewPayload: Review = {
        productId: this.productId,
        comment: this.reviewForm.value.comment,
        rating: this.reviewForm.value.rating,
        customerId: null,
        userName: "Guest"
      };

      const user = this.authService.getUser();

      if ((user?.customerId) && (this.authService.isLoggedIn())) {
        reviewPayload.userName = user.name;
        reviewPayload.customerId = user.customerId;
      }
      
      this.apiService.addReview(reviewPayload).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        this.updateProduct();
        this.snackbar.open('Comment Added Successfully', '', { duration: 2000 });
      },
        () => {
          this.snackbar.open("Couldn't Add Comment", '', { duration: 2000 });
        }
      );
      this.closeAddReviewModal();
    } else {
      this.snackbar.open('Please fill all the fields', '', { duration: 2000 });
    }
  }

  closeAddReviewModal() {
    this.showAddReviewModal = false;
    this.reviewForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}