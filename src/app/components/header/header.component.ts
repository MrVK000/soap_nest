import { SharedService } from './../../service/shared.service';
import { Component, HostListener } from '@angular/core';
import { NAV_LINKS } from '../../data/data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navLinks = NAV_LINKS;
  isSidebarOpen = false;

  constructor(public sharedService: SharedService) { }


  windowReload(): void {
    window.location.reload();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
