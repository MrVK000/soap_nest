import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopify';

  constructor(private router: Router, private loadingService: LoadingService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loadingService.hide();
      }
    });
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--baby-green', '#4CAF50');
    document.documentElement.style.setProperty('--orange', '#ffa500');
    document.documentElement.style.setProperty('--logo-white', '#fbfbfb');
    document.documentElement.style.setProperty('--red', '#ff0000');
    document.documentElement.style.setProperty('--light-pink', '#ffb0d0');
    document.documentElement.style.setProperty('--grey', '#808080');
    document.documentElement.style.setProperty('--light-green', '#a8d243');
    // document.documentElement.style.setProperty('--light-green', '#76A857');
    document.documentElement.style.setProperty('--green', '#258949');
    // document.documentElement.style.setProperty('--green', '#508C41');
    document.documentElement.style.setProperty('--white', '#FFFFFF');
    document.documentElement.style.setProperty('--light-white', '#FAFAF5');
  }

}
