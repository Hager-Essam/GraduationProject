import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private baseUrl = 'https://khaldoun52-final-models.hf.space/api/v1/api';

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(`${this.baseUrl}/`, formData);
  }

  getReport(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
