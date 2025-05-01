import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://bones.runasp.net/api/Admin/DeletePatient';
  private deleteSpecUrl = 'https://bones.runasp.net/api/Admin/DeleteSpecialist';

  constructor(private http: HttpClient) {}

  deletePatient(id: number): Observable<any> {
    const params = new HttpParams().set('Id', id.toString());
    return this.http.post(this.apiUrl, {}, {params});
  }

  deleteSpecialist(id: number): Observable<any> {
    const params = new HttpParams().set('Id', id.toString());
    return this.http.post(this.deleteSpecUrl, {}, {params});
  }


}
