import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://bones.runasp.net/api';
  // private apiUrl2 = 'https://bones.runasp.net/api';

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Patient/GetAll`);
  }

  getAllSpecialists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Specialist/GetAll`);
  }

  deletePatient(id: number): Observable<any> {
    const params = new HttpParams().set('Id', id.toString());
    return this.http.post(`${this.apiUrl}/Admin/DeletePatient`, {}, {params});
  }


  deleteSpecialist(id: number): Observable<any> {
    const params = new HttpParams().set('Id', id.toString());
    return this.http.post(`${this.apiUrl}/Admin/DeleteSpecialist`, {}, {params});
  }


}
