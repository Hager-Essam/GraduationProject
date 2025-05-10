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

  private selectedValueSource = new BehaviorSubject<string>('');
  currentSelectedValue = this.selectedValueSource.asObservable();

  changeSelectedValue(value: string) {
    this.selectedValueSource.next(value);
  }

  private fractureConfidenceSubject = new BehaviorSubject<number | null>(null);
  fractureConfidence$ = this.fractureConfidenceSubject.asObservable();

  setFractureConfidence(confidence: number | null) {
    this.fractureConfidenceSubject.next(confidence);
  }

}
