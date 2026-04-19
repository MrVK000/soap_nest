import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { Product, Review, WishlistItemPayload } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ReactiveFormsModule, RatingModule, ButtonModule, TextareaModule, DialogModule, TagModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
}) export class ProductDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  product: any = {};
  productImages: string[] = [];
  selectedImage: string = '';
  productId!: string;
  quantity = 1;
  showAddReviewModal: boolean = false;
  reviewForm: FormGroup;
  reviews: any[] = [];
  reviewsPage = 1;
  reviewsTotalPages = 1;
  reviewsLoading = false;
  isLoading = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService, private snackbar: MatSnackBar, private fb: FormBuilder, private apiService: ApiService, public sharedService: SharedService, private authService: AuthService, private cdr: ChangeDetectorRef) {
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
      this.loadReviews(true);
    });
  }

  updateProduct() {
    this.isLoading = true;
    this.cdr.markForCheck();
    const user = this.authService.getUser();
    const customerId: string = (user && user.customerId) ? user.customerId : "-";
    this.apiService.getProductById(this.productId, customerId).pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.product = res.data;
      this.sharedService.addSeo(`${this.product.name} - Buy Now | Green Glow`);
      this.productImages = (this.product.images ?? []).map((img: string) => img);
      this.selectedImage = this.productImages[0] ?? '';
      this.isLoading = false;
      this.cdr.markForCheck();
    }, () => {
      this.router.navigate(['/products']);
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
    this.cdr.markForCheck();
  }

  loadReviews(reset: boolean = false) {
    if (this.reviewsLoading) return;
    if (reset) {
      this.reviewsPage = 1;
      this.reviews = [];
    }
    this.reviewsLoading = true;
    this.cdr.markForCheck();
    this.apiService.getReviewsByProductId(this.productId, this.reviewsPage).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.reviews = reset ? (res.data ?? []) : [...this.reviews, ...(res.data ?? [])];
      this.reviewsTotalPages = res.totalPages ?? 1;
      this.reviewsLoading = false;
      this.cdr.markForCheck();
    }, () => {
      this.reviewsLoading = false;
      this.cdr.markForCheck();
    });
  }

  loadMoreReviews() {
    if (this.reviewsPage < this.reviewsTotalPages) {
      this.reviewsPage++;
      this.loadReviews();
    }
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
      this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  removeFromWishlist() {
    this.apiService.removeWishlistItem(this.product.wishlistItemId).subscribe((res: any) => {
      this.updateProduct();
      this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
    });
  }

  // addToWishlist(productId: string, customerId: string) {
  //   const wishlistPayload: WishlistItemPayload = {
  //     customerId,
  //     productId
  //   }
  //   this.apiService.addToWishlist(wishlistPayload).subscribe((res: any) => {
  //     this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
  //   });
  // }

  // removeFromWishlist(id: number) {
  //   this.apiService.removeWishlistItem(id).subscribe((res: any) => {
  //     this.snackbar.open(res?.message, '', { duration: 2000, panelClass: ['custom-snackbar'] });
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
        this.loadReviews(true);
        this.snackbar.open('Comment Added Successfully', '', { duration: 2000, panelClass: ['custom-snackbar'] });
      },
        () => {
          this.snackbar.open("Couldn't Add Comment", '', { duration: 2000, panelClass: ['custom-snackbar'] });
        }
      );
      this.closeAddReviewModal();
    } else {
      this.snackbar.open('Please fill all the fields', '', { duration: 2000, panelClass: ['custom-snackbar'] });
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