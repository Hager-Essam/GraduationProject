import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://bones.runasp.net/Account/Register';

  private userId!: string;

  constructor(private http: HttpClient,
              private router: Router) {
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

  private tokenKey = 'token';
  private userDataKey = 'userData';
  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>('https://bones.runasp.net/Account/Login', loginData).pipe(
      tap((res: any) => {
        if (res?.data?.token && res?.data?.userData && res?.data?.userId) {
          localStorage.setItem(this.tokenKey, res.data.token);
          localStorage.setItem(this.userDataKey, JSON.stringify(res.data.userData));
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('userIntId', res.data.userData.id.toString()); //
        }
      }),
      catchError(this.handleError)
    );
  }

  getUserIntId(): number {
    const intId = localStorage.getItem('userIntId');
    return intId ? parseInt(intId, 10) : 0;
  }


  getUserProfile(): any {
    const data = localStorage.getItem(this.userDataKey);
    return data ? JSON.parse(data) : null;
  }

  getUserId(): string {
    const profile = this.getUserProfile();
    return profile?.id || '';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  getStoredUserId(): string {
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

}

