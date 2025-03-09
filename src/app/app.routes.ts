import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',        
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'about',
        component:AboutUsComponent
    },
    {
        path:'contact',
        component:ContactComponent
    },
    {
        path:'login',
        component:LoginComponent
    }
];
