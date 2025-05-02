import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private baseUrl = 'https://khaldoun52-final-models.hf.space/v1/api/ai';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(`${this.baseUrl}/`, formData).pipe(
      map(response => {
        if (response.is_success && response.status_code === '202') {
          // Extract and return the id and status
          const { id, status } = response.data;
          return { id, status };
        } else {
          throw new Error('Image upload failed');
        }
      }),
      catchError(error => {
        console.error('Error uploading image:', error);
        return throwError('Error uploading image');
      })
    );
  }
  getReport(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
