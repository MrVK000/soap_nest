import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { Subject, takeUntil } from 'rxjs';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, PasswordModule, ButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private destroy$ = new Subject<void>();
  token: string = '';
  isLoading = false;
  success = false;
  invalidToken = false;

  form = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatch });

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public sharedService: SharedService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.sharedService.addSeo('Reset Password - Green Glow');
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.invalidToken = true;
    }
  }

  passwordsMatch(group: any) {
    const p = group.get('newPassword')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { mismatch: true };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.api.resetPassword(this.token, this.form.value.newPassword!).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.success = true;
        this.isLoading = false;
      },
      error: (err) => {
        const msg = err?.error?.message || 'Something went wrong. Please try again.';
        this.snackbar.open(msg, '', { duration: 4000, panelClass: ['custom-snackbar'] });
        if (err?.status === 400) this.invalidToken = true;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
