// import { html2pdf } from 'html2pdf.js';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { Subject, takeUntil } from 'rxjs';

declare var html2pdf: any;

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  private destroy$ = new Subject<void>();
  order: Order = {} as Order;
  orderId: string;

  company = {
    name: 'Green Glow',
    address: '123 Green Street, Bangalore, India',
    phone: '+91 9876543210',
    email: 'support@greenglow.com',
    support: '+91 9876543210'
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService, public sharedService: SharedService) {
    if (!(this.activatedRoute?.snapshot?.paramMap?.get('id'))) this.router.navigate(['/orders']);
    this.orderId = (this.activatedRoute?.snapshot?.paramMap?.get('id')) as string;
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.api.getOrder(this.orderId).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.order = res?.data;
    })
  }

  downloadInvoicePDF() {
    const element = document.getElementById('invoice');
    if (element) {
      const options = {
        margin: 10,
        filename: `${this.order.orderNumber}-invoice.pdf`,
        html2canvas: {
          scale: 2,
          logging: true,
          useCORS: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };
      html2pdf().from(element).set(options).save();
    }
  }

  // downloadInvoicePDF() {
  //   const element = document.getElementById('invoice');
  //   if (element) {
  //     const options = {
  //       margin: 10,
  //       filename: `${this.order.orderId}-invoice.pdf`,
  //       html2canvas: {
  //         scale: 2,
  //         logging: true,
  //         useCORS: true
  //       },
  //       jsPDF: {
  //         unit: 'mm',
  //         format: 'a4',
  //         orientation: 'portrait'
  //       }
  //     };
  //     html2pdf().from(element).set(options).save();
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
