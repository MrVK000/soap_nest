import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentPage: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.currentPage = 0;
  }

}
