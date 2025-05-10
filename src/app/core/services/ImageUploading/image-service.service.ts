import {Injectable} from '@angular/core';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private baseUrl = 'https://bones.runasp.net/api/Image';
  private currentImageId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'X-User-ID': this.authService.getUserId()
    });
  }

  uploadImage(imageFile: File, bodyPart: string): Observable<any> {
    const userId = this.authService.getUserId();
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    const formData = new FormData();
    formData.append('ImageFiles', imageFile);
    formData.append('BodyPart', bodyPart);
    formData.append('UploadedAt', new Date().toISOString());
    formData.append('Id', userId);

    return this.http.post(`${this.baseUrl}/UploadImage`, formData, {
      headers: this.getHeaders()
    }).pipe(
      tap((response: any) => {
        console.log('Upload response:', response);
        if (response?.success ) {
          this.currentImageId = response.data[0].data.id;
          console.log('Stored image ID:', this.currentImageId);
        }
      }),
      catchError(this.handleError)
    );
  }

  getImageReport(imageId?: string): Observable<any> {
    const idToUse = imageId || this.currentImageId;
    if (!idToUse) {
      console.error('No image ID available for report');
      return throwError(() => new Error('No image ID available'));
    }

    const url = `https://bones.runasp.net/api/Image/GetReportById?Id=${idToUse}`;
    console.log(`Fetching report from: ${url}`);

    return this.http.get<any>(url, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => console.log('Report response:', response)),
      catchError(this.handleError)
    );
  }

  getCurrentImageId(): string | null {
    return this.currentImageId;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
