import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentPage: number = 0;

  constructor(private titleService: Title, private metaService: Meta, private location: Location) { }

  ngOnInit(): void {
    this.currentPage = 0;
  }

  addSeo(title: string) {
    this.titleService.setTitle(title);

    this.metaService.addTags([
      { name: 'description', content: 'Discover eco-friendly handmade soaps and organic shampoos. Natural skincare for all skin types. We can deliver India!' },
      { name: 'keywords', content: 'Handmade soaps, Organic shampoo, Natural skincare, Eco-friendly products, Skin care India' },
      { name: 'author', content: 'Green Glow' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  goBack() {
    this.location.back();
  }

}
