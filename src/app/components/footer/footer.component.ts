import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  copyright: string = "";

  ngOnInit(): void {
    this.copyright = `Copyright reserved © ${new Date().getFullYear()}`
  }
}
