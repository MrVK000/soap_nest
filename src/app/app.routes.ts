import { AuthGuard } from './gaurds/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MyaccountComponent } from './components/my-account/my-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ShippingAndReturnsComponent } from './components/shipping-and-returns/shipping-and-returns.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product-details/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'about',
        component: AboutUsComponent
    },
    {
        path: 'terms',
        component: TermsAndConditionsComponent
    },
    {
        path: 'shipping-returns',
        component: ShippingAndReturnsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    // {
    //     path: 'contact',
    //     component: ContactComponent
    // },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'my-account',
        canActivate: [AuthGuard],
        component: MyaccountComponent
    },
    {
        path: 'my-orders',
        canActivate: [AuthGuard],
        component: MyOrdersComponent
    },
    {
        path: 'cart',
        canActivate: [AuthGuard],
        component: CartComponent
    },
    {
        path: 'wishlist',
        canActivate: [AuthGuard],
        component: WishlistComponent
    },
    {
        path: 'favorites',
        canActivate: [AuthGuard],
        component: FavoritesComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent
    },
    {
        path: 'payment',
        canActivate: [AuthGuard],
        component: PaymentComponent
    },
    {
        path: 'order-success',
        canActivate: [AuthGuard],
        component: OrderSuccessComponent
    },
    // {
    //     path: 'order-history',
    //     component: OrderHistoryComponent
    // },
    {
        path: 'order-details/:id',
        canActivate: [AuthGuard],
        component: OrderDetailsComponent
    },
    {
        path: 'server-error',
        component: InternalServerErrorComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },

];
