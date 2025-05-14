import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyPartService {

  private bodyParts = [
    { value: '', label: 'No Value' },
    { value: 'HAND', label: 'Hand' },
    { value: 'SHOULDER', label: 'Shoulder' },
    { value: 'FINGER', label: 'Finger' },
    { value: 'ELBOW', label: 'Elbow' },
    { value: 'HUMERUS', label: 'Humerus' },
    { value: 'FOREARM', label: 'Forearm' },
    { value: 'WRIST', label: 'Wrist' }
  ];

  private selectedBodyPartSubject = new BehaviorSubject<string>(this.bodyParts[0].value);
  selectedBodyPart$ = this.selectedBodyPartSubject.asObservable();

  constructor() {}

  getBodyParts() {
    return this.bodyParts;
  }

  setSelectedBodyPart(bodyPart: string) {
    this.selectedBodyPartSubject.next(bodyPart);
  }

  getSelectedBodyPart() {
    return this.selectedBodyPartSubject.value;
  }


}
