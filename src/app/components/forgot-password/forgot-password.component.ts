import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, InputTextModule, ButtonModule, IconFieldModule, InputIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private destroy$ = new Subject<void>();
  submitted = false;
  isLoading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private api: ApiService, public sharedService: SharedService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.sharedService.addSeo('Forgot Password - Green Glow');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.api.forgotPassword(this.form.value.email!).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.submitted = true;
        this.isLoading = false;
      },
      error: () => {
        this.snackbar.open('Something went wrong. Please try again.', '', { duration: 3000, panelClass: ['custom-snackbar'] });
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
