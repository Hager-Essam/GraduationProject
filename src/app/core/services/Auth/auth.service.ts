import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {loginUser} from '../../interface/AuthUser';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://bones.runasp.net/Account/Register';

  private userId!: string ;

  constructor(private http: HttpClient, private router: Router) {
  }


  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData, {
      responseType: 'text',
    }).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(loginData: { Email: string; Password: string }): Observable<any> {
    return this.http.post('https://bones.runasp.net/Account/Login', loginData, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      catchError(this.handleError)
    );
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
    }

    return throwError(() => new Error(message));
  }

}
