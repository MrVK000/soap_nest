import { Component } from '@angular/core';
import { NAV_LINKS } from '../../data/data';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navLinks = NAV_LINKS;
  isSidebarOpen = false;

  constructor(public cartService: CartService, private router: Router) { }


  windowReload(): void {
    window.location.reload();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
