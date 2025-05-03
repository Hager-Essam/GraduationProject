import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://bones.runasp.net/api';

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Patient/GetAll`);
  }

  getAllSpecialists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Specialist/GetAll`);
  }

  getAllSpecialistsEmails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Email/GetAll`);
  }

  deletePatient(id: number): Observable<any> {
    const params = new HttpParams().set('Id', id.toString());
    return this.http.post(`${this.apiUrl}/Admin/DeletePatient`, {}, {params});
  }

  deleteSpecialist(id: number): Observable<any> {
    const params = new HttpParams().set('Id', id.toString());
    return this.http.post(`${this.apiUrl}/Admin/DeleteSpecialist`, {}, {params});
  }

  getDeletedPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Admin/GetAllDeletedPatients`);
  }

  getDeletedSpecialist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Admin/GetAllDeletedSpecialists`);
  }


  restoreSpecialist(id: number) {
    return this.http.post<{ message: string }>(`https://bones.runasp.net/api/Admin/ResotreSpecialist?id=${id}`, {});
  }

  restorePatients(id: number) {
    return this.http.post<{ message: string }>(`https://bones.runasp.net/api/Admin/ResotrePatient?id=${id}`, {});
  }

}
