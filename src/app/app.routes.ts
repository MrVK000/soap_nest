import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MyaccountComponent } from './components/my-account/my-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

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
        path: 'product-details',
        component: ProductDetailsComponent
    },
    {
        path: 'about',
        component: AboutUsComponent
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
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'my-account',
        component: MyaccountComponent
    },
    {
        path: 'my-orders',
        component: MyOrdersComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'order-success',
        component: OrderSuccessComponent
    },
    // {
    //     path: 'order-history',
    //     component: OrderHistoryComponent
    // },
    {
        path: 'order-details',
        component: OrderDetailsComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },

];
