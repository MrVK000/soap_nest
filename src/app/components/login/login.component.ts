import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    if (this.loginForm.valid) {
      alert(`Welcome back, ${this.loginForm.value.email}!`);
      this.loginForm.reset();
    } else {
      alert('Please enter valid credentials.');
    }
  }
}
