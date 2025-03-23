import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.required]),
    terms: new FormControl(false, Validators.requiredTrue),
  });

  submitForm() {
    if (this.registerForm.valid) {
      alert(`Welcome, ${this.registerForm.value.fullName}! Your account has been created.`);
      this.registerForm.reset();
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
