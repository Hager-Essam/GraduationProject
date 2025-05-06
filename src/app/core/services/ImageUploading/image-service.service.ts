import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private reportUrl = 'https://bones.runasp.net/api/Model/GetReportById?ReportId=';

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.http.post<any>('https://bones.runasp.net/api/Model/PredictSingleImage', formData).pipe(
      map(response => {
        console.log('Upload response:', response);

        if (response.success && response.data?.id) {
          const {id, status} = response.data;
          return {id, status};
        } else {
          throw new Error('Image upload failed');
        }
      }),
      catchError(error => {
        console.error('Error uploading image:', error);
        return throwError(() => new Error('Error uploading image'));
      })
    );
  }

  getReport(id: string): Observable<any> {
    return this.http.get<any>(`${this.reportUrl}${id}`);
  }

}
