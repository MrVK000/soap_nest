import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../interfaces/interfaces';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyOrdersComponent {
  private destroy$ = new Subject<void>();
  orders: Order[] = [];
  filteredOrders = [...this.orders];
  startDate: string = '';
  endDate: string = '';
  selectedStatus: string = '';
  currentPage = 1;
  itemsPerPage = 3;

  constructor(private router: Router, private api: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    const user = this.authService.getUser();
    if (!(user?.customerId) || !(this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
      return;
    }
    this.api.getOrdersByCustomerId(user.customerId).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.orders = res?.data;
      this.applyFilters();
    })
  }

  filterByStatus(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    this.applyFilters();
  }

  filterByDate() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const withinDateRange =
        (!this.startDate || orderDate >= new Date(this.startDate)) &&
        (!this.endDate || orderDate <= new Date(this.endDate));

      const matchesStatus = this.selectedStatus ? order.status === this.selectedStatus : true;

      return withinDateRange && matchesStatus;
    });

    this.currentPage = 1; // Reset pagination when filters change
  }

  getStatusClass(status: string) {
    return {
      'pending': status === 'Pending',
      'shipped': status === 'Shipped',
      'delivered': status === 'Delivered',
      'cancelled': status === 'Cancelled'
    };
  }

  // Pagination Functions
  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filteredOrders.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  viewOrderDetails(orderId: number) {
    this.router.navigate(['/order-details', orderId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
