import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-myaccount',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyaccountComponent {
  isEditing = false;
  isChangingPassword = false;

  accountForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('johndoe@example.com', [Validators.required, Validators.email]), // Read-only
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(8)]),
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

  constructor(private snackBar: MatSnackBar) {
    // this.snackBar.open('This is a snack bar!', 'Close', { duration: 2000 });
    // this.accountForm.reset();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing)
      this.accountForm.markAsUntouched();
  }

  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    this.passwordForm.reset();
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
