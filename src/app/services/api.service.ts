import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCTS } from '../data/data';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "";

  products = PRODUCTS;

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.products;
  }

}
