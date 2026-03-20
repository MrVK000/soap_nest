import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { RegisterUserForm } from '../../interfaces/interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, InputTextModule, PasswordModule, ButtonModule, SelectModule, IconFieldModule, InputIconModule, TextareaModule, CheckboxModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private destroy$ = new Subject<void>();
  statesList: string[] = [];
  districtsList: string[] = [];
  pincodesList: string[] = [];
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    terms: new FormControl(false, Validators.requiredTrue),
  });

  constructor(private api: ApiService, private router: Router, private snackbar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.getStates();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyBoardEvent(event: KeyboardEvent) {
    if (event?.code?.toLowerCase() === 'enter') {
      this.submitForm();
    }
  }

  onNumericKeydown(event: KeyboardEvent) {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowed.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  getStates() {
    this.api.getStates().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.statesList = res.data;
      this.registerForm.patchValue({ state: this.statesList[0] });
      this.getDistrictsByState(this.statesList[0]);
    })
  }

  getDistrictsByState(state: string) {
    this.api.getDistrictsByState(state).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.districtsList = res.data;
      this.registerForm.patchValue({ district: this.districtsList[0] });
      this.getPincodesByDistrict(this.districtsList[0]);
    })
  }

  getPincodesByDistrict(district: string) {
    this.api.getPincodesByDistrict(district).pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.pincodesList = res.data;
      this.registerForm.patchValue({ pincode: this.pincodesList[0] });
    })
  }

  get state(): string {
    return this.registerForm.get('state')?.value as unknown as string;
  }

  get district(): string {
    return this.registerForm.get('district')?.value as unknown as string;
  }

  submitForm() {
    if (this.registerForm.valid) {
      const registerFormPayload: RegisterUserForm = this.registerForm.value as unknown as RegisterUserForm;
      this.api.registerUser(registerFormPayload).pipe(takeUntil(this.destroy$)).subscribe((res: { token?: string; user?: any }) => {
        if (res?.token) this.authService.setToken(res.token);
        if (res?.user) this.authService.setUser(res.user);
        this.snackbar.open(`Welcome, ${registerFormPayload.name}! Your account has been created.`, '', { duration: 2000 });
        this.registerForm.reset();
        this.router.navigate(['/home']);
      }, (error) => {
        this.snackbar.open(`Couldn't create an account.`, '', { duration: 2000 });
      });

    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.markAsDirty();
      this.snackbar.open(`Please fill out all fields correctly.`, '', { duration: 2000 });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
