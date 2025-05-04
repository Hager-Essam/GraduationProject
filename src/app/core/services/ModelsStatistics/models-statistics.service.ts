import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModelsStatisticsService {
  private baseUrl = 'https://khaldoun52-final-models.hf.space/v1/api/';

  constructor(private http: HttpClient) {
  }

  getAllModelsStatistics(): Observable<any> {
    return this.http.get(`${this.baseUrl}statistics/models`);
  }

}
