import { CartService } from './../../services/cart.service';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LoginUserForm, RegisterUserForm } from '../../interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private destroy$ = new Subject<void>();
  showPassword = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private api: ApiService, public sharedService: SharedService, private snackbar: MatSnackBar, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.resetCartCount();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyBoardEvent(event: KeyboardEvent) {
    if (event?.code?.toLowerCase() === 'enter') {
      this.submitForm();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    if (this.loginForm.valid) {
      const loginFormPayload: LoginUserForm = this.loginForm.value as unknown as LoginUserForm;

      this.api.loginUser(loginFormPayload).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
        this.authService.setToken(res.token);
        this.authService.setUser(res.user);

        this.snackbar.open(`Welcome back ${res?.user?.name ? res.user.name : ""}, logged in successful`, '', { duration: 2000 });
        this.loginForm.reset();
        this.sharedService.goBack();
      }, (error) => {
        if (error.status == 404)
          this.snackbar.open(`Couldn't find your account`, '', { duration: 2000 });
        else if (error.status == 401)
          this.snackbar.open('Please Login Again', '', { duration: 2000 });
        else
          this.snackbar.open(`Something went wrong`, '', { duration: 2000 });
      });

    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
      this.snackbar.open(`Please fill out all fields correctly`, '', { duration: 2000 });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
