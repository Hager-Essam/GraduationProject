import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'https://bones.runasp.net/api/Admin';

  constructor(private http: HttpClient) {
  }

  getAllPayment(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetTotalPayments`);
  }

  getAllTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAllTransactions`);
  }


}
