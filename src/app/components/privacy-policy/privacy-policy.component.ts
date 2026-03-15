import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {

  summaryCards = [
    { icon: 'pi pi-shield', title: 'Data Protection', desc: 'Your data is safe with us' },
    { icon: 'pi pi-ban', title: 'No Data Selling', desc: 'We never sell your data' },
    { icon: 'pi pi-lock', title: 'Secure Storage', desc: 'Encrypted & protected' },
    { icon: 'pi pi-user-edit', title: 'Your Rights', desc: 'Access, edit or delete' },
  ];

  sections = [
    { id: 'introduction', num: '1', title: 'Introduction' },
    { id: 'information-collected', num: '2', title: 'Information We Collect' },
    { id: 'how-we-use', num: '3', title: 'How We Use Your Info' },
    { id: 'data-sharing', num: '4', title: 'Data Sharing' },
    { id: 'cookies', num: '5', title: 'Cookies & Tracking' },
    { id: 'data-security', num: '6', title: 'Data Security' },
    { id: 'your-rights', num: '7', title: 'Your Rights' },
    { id: 'changes', num: '8', title: 'Changes to Policy' },
    { id: 'contact', num: '9', title: 'Contact Us' },
  ];

  collectedItems = [
    { icon: 'pi pi-user', title: 'Personal Info', desc: 'Name, email, phone number and shipping address.' },
    { icon: 'pi pi-shopping-bag', title: 'Order History', desc: 'Products purchased, amounts and timestamps.' },
    { icon: 'pi pi-desktop', title: 'Technical Data', desc: 'IP address, browser type and interaction logs.' },
  ];

  howWeUse = [
    'To process and fulfill your orders',
    'To send order confirmations and shipping updates',
    'To respond to customer service requests',
    'To improve our website and user experience',
    'To comply with legal obligations',
  ];

  dataSharing = [
    'Payment processors (e.g., Razorpay)',
    'Shipping and delivery partners',
    'Marketing platforms (with your consent)',
    'Law enforcement or regulators when legally required',
  ];

  yourRights = [
    'Access the personal data we hold about you',
    'Request correction or deletion of your data',
    'Withdraw consent for marketing communications',
    'Lodge a complaint with a data protection authority',
  ];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.addSeo('Privacy Policy - Green Glow');
  }

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
