import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private specIdSource = new BehaviorSubject<number | null>(null);
  currentSpecId = this.specIdSource.asObservable();

  changeSpecId(specId: number | null) {
    this.specIdSource.next(specId);
  }
}
