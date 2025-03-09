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
    document.documentElement.style.setProperty('--light-green', '#76A857');
    document.documentElement.style.setProperty('--white', '#FFFFFF');
    document.documentElement.style.setProperty('--light-white', '#FAFAF5');
    document.documentElement.style.setProperty('--green', '#508C41');
  }

}
