import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon, Product } from './../../interfaces/interfaces';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';
import { RegionService } from '../../services/region.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DividerModule } from 'primeng/divider';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule, SelectModule, TextareaModule, IconFieldModule, InputIconModule, DividerModule, SafeUrlPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {
  private destroy$ = new Subject<void>();
  statesList: string[] = [];
  districtsList: string[] = [];
  pincodesList: string[] = [];
  products: Product[] = [];
  isLoading = true;
  coupons: FormGroup;
  couponDiscountPercentage!: number;
  totalPrice: number = 0;
  gst: number = 0;
  deliveryCharge: number = 50;
  grandTotal: string = '';
  razorpayKey = environment.razorpayKey; // Public key configured per-environment

  checkoutForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    paymentMethod: new FormControl('Online payment', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private api: ApiService,
    private authService: AuthService,
    public sharedService: SharedService,
    private fb: FormBuilder,
    private cartService: CartService,
    private regionService: RegionService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data?: Product[] } | undefined;

    if (state && Array.isArray(state.data) && state.data.length > 0) {
      this.products = state.data;
      console.log(">>>> products  >>>  ", this.products);

      this.calculateTotal();
    } else if (this.cartService.cartItems.length > 0) {
      this.products = this.cartService.cartItems as unknown as Product[];
      this.calculateTotal();
    } else {
      this.router.navigate(
        this.authService.isLoggedIn() ? ['/cart'] : ['/products']
      );
    }

    this.coupons = fb.group({
      formArray: fb.array([])
    })
  }

  ngOnInit() {
    this.loadRazorpayScript();
    this.patchUserDetails();
    this.getStates();
    this.addCoupon();
  }


  get getCoupons(): FormArray {
    return this.coupons.get("formArray") as FormArray;
  }

  get getCouponsCount(): number {
    return (this.coupons.get("formArray") as FormArray).getRawValue().length;
  }

  getCouponVerificationStatus(i: number): boolean {
    return ((this.coupons.get("formArray") as FormArray).at(i) as FormGroup)?.get('isVerified')?.value;
  }

  addCoupon() {
    const coupon = this.fb.group({
      code: [''],
      isVerified: [false]
    })
    this.getCoupons.push(coupon);
  }

  removeCoupon(i: number) {
    this.getCoupons.removeAt(i);
  }

  verifyCoupon(i: number) {
    const coupon = this.getCoupons.at(i);
    const couponCode = coupon.get('code')?.value?.trim();
    if (!coupon.get('isVerified')?.value) {
      if (this.getCoupons.valid && couponCode.length > 0) {
        this.api.validateCouponCode(couponCode, parseFloat(this.grandTotal)).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
          coupon.get('isVerified')?.setValue(true);
          this.grandTotal = res?.data?.discountedTotal.toFixed(2);
          this.couponDiscountPercentage = res?.data?.discount.toFixed(2);
          this.snackbar.open("Added coupon discount", '', { duration: 3000, panelClass: ['custom-snackbar'] })
        }, (error) => {
          let errorMessage = "Error while validating the coupon";
          if (error?.error?.errors && error?.error?.errors?.length > 0)
            errorMessage = error?.error?.errors[0]?.msg
          else
            errorMessage = error?.error?.message

          this.snackbar.open(errorMessage, '', { duration: 3000, panelClass: ['custom-snackbar'] })
          coupon.get('isVerified')?.setValue(false);
        })
      } else {
        this.snackbar.open("Please use a valid coupon code", '', { duration: 3000, panelClass: ['custom-snackbar'] });
      }
    }
  }

  onNumericKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    // Allow navigation/edit keys
    if (allowed.includes(event.key)) {
      return;
    }

    // Block non-numeric keys
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Enforce max length = 6
    if (input.value && input.value.length >= 6) {
      event.preventDefault();
    }
  }

  calculateTotal() {
    this.totalPrice = this.products.reduce((sum, product) => sum + parseFloat(product.price as unknown as string), 0);
    this.gst = this.totalPrice * 0.18;
    this.grandTotal = (this.totalPrice + this.gst + this.deliveryCharge).toFixed(2);
  }

  patchUserDetails() {
    const user = this.authService.getUser();
    if (this.authService.isLoggedIn() && user) {
      this.checkoutForm.patchValue({
        fullName: user?.name,
        address: user?.address,
        state: user?.state,
        district: user?.district,
        pincode: user?.pincode,
        phone: user?.phone,
      });
    }
    this.checkoutForm.get("paymentMethod")?.disable();
  }

  getStates() {
    this.regionService.getStates().pipe(takeUntil(this.destroy$)).subscribe(states => {
      this.statesList = states;
      const user = this.authService.getUser();
      const savedState = user?.state && states.includes(user.state) ? user.state : states[0];
      this.checkoutForm.patchValue({ state: savedState });
      this.getDistrictsByState(savedState);
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  getDistrictsByState(state: string) {
    this.regionService.getDistrictsByState(state).pipe(takeUntil(this.destroy$)).subscribe(districts => {
      this.districtsList = districts;
      const user = this.authService.getUser();
      const savedDistrict = user?.district && districts.includes(user.district) ? user.district : districts[0];
      this.checkoutForm.patchValue({ district: savedDistrict });
      this.getPincodesByDistrict(savedDistrict);
    });
  }

  getPincodesByDistrict(district: string) {
    this.regionService.getPincodesByDistrict(district).pipe(takeUntil(this.destroy$)).subscribe(pincodes => {
      this.pincodesList = pincodes;
      const user = this.authService.getUser();
      const savedPincode = user?.pincode && pincodes.includes(user.pincode) ? user.pincode : pincodes[0];
      this.checkoutForm.patchValue({ pincode: savedPincode });
      this.cdr.markForCheck();
    });
  }

  get state(): string {
    return this.checkoutForm.get('state')?.value as unknown as string;
  }

  get district(): string {
    return this.checkoutForm.get('district')?.value as unknown as string;
  }

  placeOrder(): void {
    // const amount = 500; // INR

    // this.api.makePayment(amount).pipe(takeUntil(this.destroy$)).subscribe((order: any) => {
    //   const options = {
    //     key: 'rzp_test_MfwSb09chePBvD', // from Razorpay dashboard
    //     amount: order.amount,
    //     currency: 'INR',
    //     name: 'Test Store',
    //     description: 'Test Transaction',
    //     order_id: order.id,
    //     handler: (response: any) => {
    //       // optional: verify payment
    //       this.verifyPayment(response);
    //     },
    //     prefill: {
    //       name: 'Your Name',
    //       email: 'you@example.com',
    //       contact: '9999999999'
    //     },
    //     theme: {
    //       color: '#3399ccff'
    //     }
    //   };
    //   const rzp = new Razorpay(options);
    //   rzp.open();
    // });
  }

  verifyPayment(paymentResponse: any, orderId?: string) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;
    const verifyPaymentPayload = { razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature };
    this.api.verifyPayment(verifyPaymentPayload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.snackbar.open('Payment successful!', '', { duration: 3000, panelClass: ['custom-snackbar'] });
        this.router.navigate(['/order-success'], { state: { orderId } });
      },
      error: () => {
        this.snackbar.open('Payment verification failed. Please contact support.', '', { duration: 4000, panelClass: ['custom-snackbar'] });
      }
    });
  }


  cancelOrder(): void {
    this.sharedService.goBack();
  }



  // {
  //   "amount": 50000,
  //   "amount_due": 50000,
  //   "amount_paid": 0,
  //   "attempts": 0,
  //   "created_at": 1754238616,
  //   "currency": "INR",
  //   "entity": "order",
  //   "id": "order_R0vboXWoLzy303",
  //   "notes": [],
  //   "offer_id": null,
  //   "receipt": "order_rcptid_1754238621646",
  //   "status": "created"
  // }








  // placeOrder() {
  //   if (this.checkoutForm.valid) {

  //     const orderId = this.getOrderId();
  //     const options = {
  //       key: this.razorpayKey,
  //       amount: parseFloat(this.grandTotal) * 100, // Convert to paise
  //       currency: 'INR',
  //       name: 'Eco-Friendly Store',
  //       description: `Order #${orderId}`,
  //       handler: (response: any) => {
  //         this.router.navigate(['/order-success'], { state: { orderId: orderId } });
  //       },
  //       prefill: {
  //         name: 'Customer Name',
  //         email: 'customer@example.com',
  //         contact: '9999999999'
  //       },
  //       theme: {
  //         color: '#3399cc'
  //       }
  //     };

  //     const rzp = new Razorpay(options);
  //     rzp.open();
  //   }
  // }

  getOrderId() {
    return 'ORD' + Math.floor(100000 + Math.random() * 900000);
  }

  loadRazorpayScript() {
    const existingScript = Array.from(document.getElementsByTagName('script')).find(
      (s) => s.src === 'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.defer = true;
    document.body.appendChild(script);
  }

  completePayment() {
    if (!this.checkoutForm.valid || this.products.length === 0) {
      this.snackbar.open('Please check your details and cart before making payment.', '', { duration: 3000, panelClass: ['custom-snackbar'] });
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const orderId = this.getOrderId();
    const options = {
      key: this.razorpayKey,
      amount: parseFloat(this.grandTotal) * 100, // Convert to paise
      currency: 'INR',
      name: 'Eco-Friendly Store',
      description: `Order #${orderId}`,
      handler: (response: any) => {
        this.verifyPayment(response, orderId);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
