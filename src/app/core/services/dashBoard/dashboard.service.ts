import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {Patient, Specialist} from '../../interface/UserData';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://bones.runasp.net/api';

  getAllSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.baseUrl}/Specialist/GetAll`);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/Patient/GetAll`);
  }

  getAllDeletedSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.baseUrl}/Admin/GetAllDeletedPatients`);
  }

  getAllDeletedPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/Admin/GetAllDeletedSpecialists`);
  }

  getSpecialistRating(specialistId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Rating/GetSpecialistRate?specialistId=${specialistId}`, {specialistId});
  }
  getUserImages(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Patient/GetAllPatientUploadedImages?id=${userId}`).pipe(
      catchError(error => {
        if (error.status === 500 && error.error?.details === 'User has not uploaded any images Yet!') {
          return of({ success: false, details: error.error.details });
        }
        return throwError(error);
      })
    );
  }
  submitRating(specialistId: string, rating: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Rating/RateSpecialist`, { specialistId, rating });
  }
}




