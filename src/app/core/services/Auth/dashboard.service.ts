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

  private SpecialistsUrl = 'https://bones.runasp.net/api/Specialist/GetAll';
  private PatientsUrl = 'https://bones.runasp.net/api/Patient/GetAll';
  private DeletedSpecialistsUrl = 'http://bones.runasp.net/api/Admin/GetAllDeletedSpecialists';
  private DeletedPatientsUrl = 'http://bones.runasp.net/api/Admin/GetAllDeletedPatients';

  getAllSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(this.SpecialistsUrl);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.PatientsUrl);
  }

  getAllDeletedSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(this.DeletedSpecialistsUrl);
  }

  getAllDeletedPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.DeletedPatientsUrl);
  }

}




