import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopify';

  
  ngOnInit(): void {
    // document.documentElement.style.setProperty('--lavendar', '#e6e6fa');
    // document.documentElement.style.setProperty('--gold', '#d4af37');
    // document.documentElement.style.setProperty('--pink', '#ffb0d0');
    document.documentElement.style.setProperty('--grey', '#808080');
    document.documentElement.style.setProperty('--light-green', '#76A857');
    document.documentElement.style.setProperty('--white', '#FFFFFF');
    document.documentElement.style.setProperty('--light-white', '#FAFAF5');
    document.documentElement.style.setProperty('--green', '#508C41');
  }

}
