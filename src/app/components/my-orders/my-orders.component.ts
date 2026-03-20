import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { Order } from '../../interfaces/interfaces';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule, TagModule, SelectModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  orders: Order[] = [];
  loading = false;
  page = 1;
  totalPages = 1;
  private isReady = false;

  selectedStatus: string = '';
  statusOptions = [
    { label: 'All Orders', value: '' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Cancelled', value: 'Cancelled' },
  ];

  constructor(
    private router: Router,
    private api: ApiService,
    private authService: AuthService,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sharedService.addSeo('My Orders - Green Glow');
    this.loadOrders(1, false);
  }

  loadOrders(page: number, append: boolean) {
    const user = this.authService.getUser();
    if (!user?.customerId || !this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loading = true;
    this.api.getOrdersByCustomerId(user.customerId, page).subscribe((res: any) => {
      const incoming: Order[] = res?.data ?? [];
      this.orders = append ? [...this.orders, ...incoming] : incoming;
      this.page = res?.page ?? page;
      this.totalPages = res?.totalPages ?? 1;
      this.loading = false;
      this.isReady = true;
      this.cdr.markForCheck();
    }, () => { this.loading = false; this.cdr.markForCheck(); });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isReady || this.loading || this.page >= this.totalPages) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (nearBottom) this.loadOrders(this.page + 1, true);
  }

  onStatusChange() {
    this.loadOrders(1, false);
  }

  get filteredOrders(): Order[] {
    if (!this.selectedStatus) return this.orders;
    return this.orders.filter(o => o.status === this.selectedStatus);
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'info' | 'danger' | 'secondary' {
    const map: Record<string, 'success' | 'warn' | 'info' | 'danger' | 'secondary'> = {
      Delivered: 'success', Shipped: 'info', Pending: 'warn', Cancelled: 'danger'
    };
    return map[status] ?? 'secondary';
  }

  getStatusIcon(status: string): string {
    const map: Record<string, string> = {
      Delivered: 'pi-check-circle', Shipped: 'pi-truck', Pending: 'pi-clock', Cancelled: 'pi-times-circle'
    };
    return 'pi ' + (map[status] ?? 'pi-circle');
  }

  viewOrderDetails(orderId: number) {
    this.router.navigate(['/order-details', orderId]);
  }
}
