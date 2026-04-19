import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  // const loader = inject(LoadingService);
  const token = authService.getToken();
  const isAuthRefreshOrLogoutEndpoint = req.url.includes('/auth/refresh') || req.url.includes('/auth/logout');

  // loader.show();

  const clonedRequest = token && !isAuthRefreshOrLogoutEndpoint ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }) : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error?.status === 401 || error?.status === 403) {
        // Never try refresh on auth endpoints themselves.
        if (isAuthRefreshOrLogoutEndpoint) {
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = authService.getToken();
            if (!newToken) throw error;

            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return next(retryRequest);
          }),
          catchError((refreshErr) => {
            authService.logout(false);
            snackbar.open("Please login", '', { duration: 3000, panelClass: ['custom-snackbar'] });
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    }),
    // finalize(() => loader.hide())
  );
};
