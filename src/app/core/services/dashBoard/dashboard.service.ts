import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient, Specialist} from '../interface/UserData';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'https://bones.runasp.net/api';
  private SpecialistsUrl = 'https://bones.runasp.net/api/Specialist/GetAll';
  private PatientsUrl = 'https://bones.runasp.net/api/Patient/GetAll';
  private DeletedSpecialistsUrl = 'https://bones.runasp.net/api/Admin/GetAllDeletedSpecialists';
  private DeletedPatientsUrl = 'https://bones.runasp.net/api/Admin/GetAllDeletedPatients';

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

}




