import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentPage: number = 0;

  ngOnInit(): void {
    this.currentPage = 0;
  }

}
