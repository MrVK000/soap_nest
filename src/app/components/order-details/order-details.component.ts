import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

declare var html2pdf: any;

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, ButtonModule, TagModule, DividerModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {
  private destroy$ = new Subject<void>();
  order: Order = {} as Order;
  orderId: string;
  loading = true;

  company = {
    name: 'Green Glow',
    address: '123 Green Street, Bangalore, India',
    email: 'support@greenglow.com',
    support: '+91 9876543210'
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    if (!this.activatedRoute?.snapshot?.paramMap?.get('id')) this.router.navigate(['/orders']);
    this.orderId = this.activatedRoute?.snapshot?.paramMap?.get('id') as string;
  }

  ngOnInit() {
    this.api.getOrder(this.orderId).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.order = res?.data;
      this.loading = false;
      this.cdr.markForCheck();
    });
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

  getStatusStep(status: string): number {
    const steps: Record<string, number> = { Pending: 1, Shipped: 2, Delivered: 3, Cancelled: 0 };
    return steps[status] ?? 0;
  }

  downloadInvoicePDF() {
    const element = document.getElementById('invoice');
    if (element) {
      const options = {
        margin: 10,
        filename: `${this.order.orderNumber}-invoice.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(options).save();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
