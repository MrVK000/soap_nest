import { SharedService } from './../../services/shared.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterUserForm } from '../../interfaces/interfaces';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, DropdownModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private destroy$ = new Subject<void>();
  statesList: string[] = [];
  districtsList: string[] = [];
  pincodesList: string[] = [];
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  constructor(private api: ApiService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getStates();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyBoardEvent(event: KeyboardEvent) {
    if (event?.code?.toLowerCase() === 'enter') {
      this.submitForm();
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
      this.api.registerUser(registerFormPayload).pipe(takeUntil(this.destroy$)).subscribe((res) => {
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
