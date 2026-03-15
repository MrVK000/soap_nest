import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Message } from '../../interfaces/interfaces';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule, TextareaModule, IconFieldModule, InputIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  submitting = false;

  contactForm = new FormGroup({
    name:        new FormControl('', [Validators.required, Validators.minLength(2)]),
    email:       new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    message:     new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  infoItems = [
    { icon: 'pi pi-envelope', label: 'Email',   value: 'hello@greenglow.com' },
    { icon: 'pi pi-phone',    label: 'Phone',   value: '+91 98765 43210' },
    { icon: 'pi pi-map-marker', label: 'Location', value: 'Kerala, India' },
    { icon: 'pi pi-clock',    label: 'Working Hours', value: 'Mon – Sat, 9am – 6pm' },
  ];

  constructor(private api: ApiService, private snackbar: MatSnackBar) { }

  onNumericKeydown(event: KeyboardEvent) {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowed.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const message: Message = {
      name:        this.contactForm.value.name!.trim(),
      email:       this.contactForm.value.email!.trim(),
      phoneNumber: this.contactForm.value.phoneNumber!.trim(),
      message:     this.contactForm.value.message!.trim()
    };

    this.api.sendMessage(message).subscribe({
      next: () => {
        this.snackbar.open(`Thank you, ${message.name}! We'll get back to you soon.`, '', { duration: 3000 });
        this.contactForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.snackbar.open("Couldn't send message. Please try again.", '', { duration: 3000 });
        this.submitting = false;
      }
    });
  }
}
