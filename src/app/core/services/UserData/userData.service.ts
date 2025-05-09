import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  clear(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
