import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshInFlight$: Observable<any> | null = null;
  private refreshApplySeq = 0;

  constructor(private api: ApiService, private snackbar: MatSnackBar) { }

  private isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      if (!payload) {
        return true;
      }
      // JWT uses base64url. Convert to base64 for `atob`.
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.length % 4 === 0 ? base64 : `${base64}${'='.repeat(4 - (base64.length % 4))}`;
      const decoded = JSON.parse(atob(padded));
      if (!decoded?.exp) {
        // If no exp claim is present, treat token as expired to be safe.
        return true;
      }
      const nowInSeconds = Math.floor(Date.now() / 1000);
      return decoded.exp < nowInSeconds;
    } catch {
      // Any parsing/decoding error means we cannot trust the token.
      return true;
    }
  }

  isLoggedIn(): boolean {
    const rawToken = localStorage.getItem('token');
    const token: string = (rawToken && rawToken.trim().length > 0 ? rawToken.trim() : '') as string;

    if (!(token.length > 0)) {
      this.clearAuthState();
      return false;
    }

    // Do not force-logout on expiry here. The interceptor will transparently refresh
    // the access token when APIs start returning 401.
    return true;
  }

  setToken(token: string): void {
    localStorage.setItem("token", token)
  }

  getToken(): string {
    return (localStorage.getItem('token')?.trim() ? localStorage.getItem('token')?.trim() : "") as string;
  }

  setUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): User | null {
    let userString: string = (localStorage.getItem('user')?.trim() ? localStorage.getItem('user')?.trim() : "") as string;
    userString = userString.trim();
    return (userString.length > 0) ? JSON.parse(userString) as User : null;
  }

  private clearAuthState(): void {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
  }

  /**
   * Calls backend to revoke the refresh token cookie and clears local auth state.
   * This is intentionally non-blocking; UI state is cleared immediately.
   */
  logout(showSnackbar: boolean = true): void {
    this.refreshApplySeq += 1; // invalidate any in-flight refresh responses
    this.refreshInFlight$ = null;
    this.clearAuthState();
    this.api.logout().pipe(
      catchError(() => {
        // Even if server logout fails, local session should be cleared.
        return throwError(() => new Error('logout_failed'));
      })
    ).subscribe({
      error: () => { /* ignore */ },
    });
    if (showSnackbar) {
      this.snackbar.open(`Logged out successfully`, '', { duration: 2000 });
    }
  }

  refreshToken(): Observable<{ token: string; user: User }> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$ as Observable<{ token: string; user: User }>;
    }

    const applySeq = this.refreshApplySeq;
    this.refreshInFlight$ = this.api.refreshSession().pipe(
      tap((res: any) => {
        // If logout happened while refresh was in-flight, ignore refresh result.
        if (applySeq !== this.refreshApplySeq) return;
        if (res?.token) this.setToken(res.token);
        if (res?.user) this.setUser(res.user);
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
      finalize(() => {
        this.refreshInFlight$ = null;
      })
    );

    return this.refreshInFlight$ as Observable<{ token: string; user: User }>;
  }
}
