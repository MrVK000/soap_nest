import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-myaccount',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.scss'
})
export class MyaccountComponent {
  isEditing = false;
  isChangingPassword = false;

  accountForm = new FormGroup({
    fullName: new FormControl('John Doe', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('johndoe@example.com', [Validators.required, Validators.email]), // Read-only
    phone: new FormControl('1234567890', [Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('123 Greenway Street, Eco City')
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  orderHistory = [
    { id: 101, date: 'March 5, 2025', total: 15.99 },
    { id: 102, date: 'March 6, 2025', total: 23.50 },
    { id: 103, date: 'March 8, 2025', total: 8.99 }
  ];


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
  }

  saveChanges() {
    if (this.accountForm.valid) {
      alert('Profile updated successfully!');
      this.isEditing = false;
    }
  }

  changePassword() {
    if (this.passwordForm.valid &&
      this.passwordForm.value.newPassword === this.passwordForm.value.confirmPassword) {
      alert('Password updated successfully!');
      this.isChangingPassword = false;
      this.passwordForm.reset();
    } else {
      alert('Passwords do not match.');
    }
  }
}
