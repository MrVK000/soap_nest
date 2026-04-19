import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/interfaces';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-myaccount',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterModule,
    ButtonModule, InputTextModule, TextareaModule, PasswordModule, IconFieldModule, InputIconModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyaccountComponent implements OnInit {
  isEditing = false;
  isChangingPassword = false;
  user: User | null = null;

  accountForm = new FormGroup({
    fullName: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    phone: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(5)]),
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.addSeo('My Account - Green Glow');
    this.user = this.authService.getUser();
    if (this.user) {
      this.accountForm.patchValue({
        fullName: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address,
      });
    }
  }

  getInitials(): string {
    const name = this.accountForm.get('fullName')?.value || this.user?.name || 'U';
    return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  }

  onNumericKeydown(event: KeyboardEvent) {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowed.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.accountForm.enable();
      this.accountForm.get('email')?.disable();
      this.accountForm.markAsUntouched();
    } else {
      this.accountForm.disable();
      if (this.user) {
        this.accountForm.patchValue({
          fullName: this.user.name,
          phone: this.user.phone,
          address: this.user.address,
        });
      }
    }
  }

  saveChanges() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      this.snackbar.open('Please fix the errors in the form.', '', { duration: 3000, panelClass: ['custom-snackbar'] });
      return;
    }
    const { fullName, phone, address } = this.accountForm.getRawValue();
    this.api.updateProfile(this.user!.customerId, { name: fullName!, phone: phone!, address: address! })
      .subscribe({
        next: (res: any) => {
          if (this.user) {
            this.user = { ...this.user, name: fullName!, phone: phone!, address: address! };
            this.authService.setUser(this.user);
          }
          this.snackbar.open(res?.message ?? 'Profile updated successfully!', '', { duration: 3000, panelClass: ['custom-snackbar'] });
          this.isEditing = false;
          this.accountForm.disable();
        },
        error: (err) => {
          this.snackbar.open(err?.error?.message ?? 'Failed to update profile.', '', { duration: 3000, panelClass: ['custom-snackbar'] });
        }
      });
  }

  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    this.passwordForm.reset();
  }

  changePassword() {
    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    if (newPassword !== confirmPassword) {
      this.passwordForm.markAllAsTouched();
      this.snackbar.open('Passwords do not match.', '', { duration: 3000, panelClass: ['custom-snackbar'] });
      return;
    }
    this.api.updatePassword(this.user!.customerId, { oldPassword: oldPassword!, newPassword: newPassword! })
      .subscribe({
        next: (res: any) => {
          this.snackbar.open(res?.message ?? 'Password updated successfully!', '', { duration: 3000, panelClass: ['custom-snackbar'] });
          this.isChangingPassword = false;
          this.passwordForm.reset();
        },
        error: (err) => {
          this.snackbar.open(err?.error?.message ?? 'Failed to update password.', '', { duration: 3000, panelClass: ['custom-snackbar'] });
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
