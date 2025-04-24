import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private user: any = null;

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.user) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
    return this.user;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
