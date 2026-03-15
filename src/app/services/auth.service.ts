import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private snackbar: MatSnackBar) { }

  private isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      if (!payload) {
        return true;
      }
      const decoded = JSON.parse(atob(payload));
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
      this.logout();
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.logout();
      this.snackbar.open('Your session has expired. Please login again.', '', { duration: 3000 });
      return false;
    }

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

  logout(): void {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    this.snackbar.open(`Logged out successfully`, '', { duration: 2000 });
  }
}
