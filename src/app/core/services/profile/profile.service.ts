import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  getPatientUploadedImages(userId: string) {
    return this.http.get<any>(`https://bones.runasp.net/api/Patient/GetAllPatientUploadedImages?Id=${userId}`);
  }

}
