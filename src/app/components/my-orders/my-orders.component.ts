import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  myOrders = [
    { orderId: "ORD123456", orderDate: "2025-03-20", totalAmount: 1200, paymentMethod: "Online Payment", status: "Shipped" },
    { orderId: "ORD123457", orderDate: "2025-03-18", totalAmount: 780, paymentMethod: "Cash on Delivery", status: "Delivered" },
    { orderId: "ORD123458", orderDate: "2025-03-22", totalAmount: 1500, paymentMethod: "Online Payment", status: "Pending" },
    { orderId: "ORD123459", orderDate: "2025-03-19", totalAmount: 999, paymentMethod: "Cash on Delivery", status: "Cancelled" },
    { orderId: "ORD123460", orderDate: "2025-03-21", totalAmount: 2000, paymentMethod: "Online Payment", status: "Pending" }
  ];

  filteredOrders = [...this.myOrders];
  startDate: string = '';
  endDate: string = '';
  selectedStatus: string = '';

  // Pagination Variables
  currentPage = 1;
  itemsPerPage = 3;

  constructor(private router: Router) { }

  ngOnInit() {
    this.applyFilters();
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
    this.filteredOrders = this.myOrders.filter(order => {
      const orderDate = new Date(order.orderDate);
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

  viewOrderDetails(orderId: string) {
    this.router.navigate(['/order-details'], { state: { orderId } });
  }
}
