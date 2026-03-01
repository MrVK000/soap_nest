import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private snackbar: MatSnackBar) { }

  isLoggedIn(): boolean {
    const token: string = (localStorage.getItem('token')?.trim() ? localStorage.getItem('token')?.trim() : "") as string;
    if (!(token.length > 0))
      this.logout();
    return token.length > 0;
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
