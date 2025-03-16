import { Injectable } from '@angular/core';
import { CART_ITEMS } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentPage: number = 0;
  cartCount = 0;

  constructor() {
    this.cartCount = CART_ITEMS.length;
  }

  ngOnInit(): void {
    this.currentPage = 0;
  }

}
