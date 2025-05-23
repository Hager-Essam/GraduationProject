import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://bones.runasp.net/Account/Register';
  private userId!: string;

  private tokenKey = 'token';
  private userDataKey = 'userData';

  private loggedIn = new BehaviorSubject<boolean>(false); // default false
  public isLoggedIn$ = this.loggedIn.asObservable();

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser && this.getToken()) {
      // If token exists on init, user is logged in
      this.loggedIn.next(true);
    }
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData, {
      responseType: 'text',
    }).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>('https://bones.runasp.net/Account/Login', loginData).pipe(
      tap((res: any) => {
        if (this.isBrowser && res?.data?.token && res?.data?.userData && res?.data?.userId) {
          localStorage.setItem(this.tokenKey, res.data.token);
          localStorage.setItem(this.userDataKey, JSON.stringify(res.data.userData));
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('userIntId', res.data.userData.id.toString());
          this.loggedIn.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  getUserIntId(): number {
    if (!this.isBrowser) return 0;
    const intId = localStorage.getItem('userIntId');
    return intId ? parseInt(intId, 10) : 0;
  }

  getUserProfile(): any {
    if (!this.isBrowser) return null;
    const data = localStorage.getItem(this.userDataKey);
    return data ? JSON.parse(data) : null;
  }

  getUserId(): string {
    const profile = this.getUserProfile();
    return profile?.id || '';
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.tokenKey);
  }

  setUserRole(role: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem('role', role);
  }

  getUserRole(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('role');
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getStoredUserId(): string {
    if (!this.isBrowser) return '';
    return localStorage.getItem('userId') || '';
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'An unknown error occurred!';

    if (error.status === 400 && error.error) {
      const errorObj = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;

      if (errorObj.errors && typeof errorObj.errors === 'object') {
        const validationErrors = errorObj.errors;
        const allMessages: string[] = [];

        for (const key in validationErrors) {
          if (validationErrors[key] && validationErrors[key].length > 0) {
            allMessages.push(...validationErrors[key]);
          }
        }

        if (allMessages.length > 0) {
          message = allMessages[0];
        } else if (errorObj.title) {
          message = errorObj.title;
        }

      } else if (errorObj.success === false && errorObj.message) {
        message = errorObj.message;
      }

    } else if (error.status === 0) {
      message = 'Cannot connect to server. Please try again later.';
    } else if (error.status === 404 && error.error?.message === 'Invalid Data') {
      message = 'Account not found. Please check your credentials or sign up.';
    } else if (error.status === 0) {
      message = 'Cannot connect to server. Please try again later.';
    }

    return throwError(() => new Error(message));
  }

  getUserName(): string {
    const user = this.getUserProfile();
    return user?.userName || '';
  }

  private forgetPassUrl = 'https://bones.runasp.net/api/Account/ForgetPassword';

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.forgetPassUrl}`, { email });
  }

  private verifyUrl = 'https://bones.runasp.net/api/Account/VerifyResetCode';
  verifyResetCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.verifyUrl}`, { email, code });
  }
}
