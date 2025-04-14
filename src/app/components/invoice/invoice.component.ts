import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import html2pdf from 'html2pdf.js';

declare var html2pdf: any;
@Component({
  selector: 'app-invoice',
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  order: any;
  company = {
    name: 'EcoGlow Organics',
    address: '123 Green Street, Bangalore, India',
    phone: '+91 9876543210',
    email: 'support@ecoglow.com',
    support: '+91 9876543210'
  };

  ngOnInit() {
    // Sample order; replace with actual data
    this.order = {
      id: 'INV123456',
      date: new Date(),
      customer: {
        name: 'Aditi Sharma',
        address: '456 Blossom Lane, Mumbai',
        phone: '+91 9123456789',
        email: 'aditi@example.com'
      },
      items: [
        { name: 'Neem Soap', quantity: 2, price: 329 },
        { name: 'Lemon Shampoo', quantity: 1, price: 549 }
      ],
      subtotal: 1207,
      taxRate: 5,
      taxAmount: 60.35,
      deliveryCharge: 50,
      total: 1317.35
    };
  }

  downloadPDF() {
    const element = document.getElementById('invoice');
    const opt = {
      margin: 0.3,
      filename: `${this.order.orderId}-invoice.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {},
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  }
}


