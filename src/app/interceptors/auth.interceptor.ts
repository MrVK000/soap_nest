import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  // const loader = inject(LoadingService);
  const token = authService.getToken();

  // loader.show();

  const clonedRequest = token ? req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    }),
  }) : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      console.error("Error: ", error);
      if (error.status === 401 || error.status === 403) {
        authService.logout();
        snackbar.open("Please login", '', { duration: 3000 });
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
    // finalize(() => loader.hide())
  );
};
