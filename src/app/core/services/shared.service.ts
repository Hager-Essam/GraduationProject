import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private specialistIdSource = new BehaviorSubject<number | null>(null);
  currentSpecId$ = this.specialistIdSource.asObservable();

  changeSpecId(id: number | null) {
    this.specialistIdSource.next(id);
  }
}
