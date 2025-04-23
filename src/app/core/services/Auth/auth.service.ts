import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {loginUser} from '../interface/AuthUser';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://bones.runasp.net/account/register';

  constructor(private http: HttpClient,private router:Router) {}

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData,{
      responseType: 'text',
    });
  }

  loginUser(loginData: { Email: string; Password: string }): Observable<any> {
    return this.http.post('http://bones.runasp.net/account/login', loginData, {
      headers: { 'Content-Type': 'application/json' } // Set content type to JSON
    });
  }

}
