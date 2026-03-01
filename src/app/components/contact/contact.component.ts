import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Message } from '../../interfaces/interfaces';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private api: ApiService, private snackbar: MatSnackBar) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  submitForm() {
    if (this.contactForm.valid) {

      const message: Message = {
        name: this.contactForm.get('name')?.value?.trim(),
        email: this.contactForm.get('email')?.value?.trim(),
        phoneNumber: this.contactForm.get('phoneNumber')?.value?.trim(),
        message: this.contactForm.get('message')?.value?.trim()
      }

      this.api.sendMessage(message).subscribe((res: any) => {
        this.snackbar.open(`Thank you, ${this.contactForm.value.name}! We will get back to you soon.`, "", { duration: 3000 })
        this.contactForm.reset();
      })
    } else {
      this.snackbar.open('Please fill all the fields', "", { duration: 3000 })
      this.contactForm.markAllAsTouched();
      this.contactForm.markAsDirty();
    }
  }
}
