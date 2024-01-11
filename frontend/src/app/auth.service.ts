// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getUser(): any | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(token: string, user: any): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isLoggedInSubject.next(false);
  }
  getUserInfo(): string | null {
    const user = localStorage.getItem(this.USER_KEY);

    console.log('User from localStorage:', user);

    if (user) {
      const userObj = JSON.parse(user);
      console.log('User object:', userObj);
      return userObj.tipo || null;
    }

    return null;
  }

  getTokenInfo(): any | null {
    return this.getToken();
  }
}
