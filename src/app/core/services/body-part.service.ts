import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyPartService {
  private bodyParts = [

    { value: '', label: 'No Value' },
    { value: 'Hand', label: 'Hand' },
    { value: 'Arm', label: 'Arm' },
    { value: 'Shoulder', label: 'Shoulder' },
    { value: 'Finger', label: 'Finger' },
    { value: 'Elbow', label: 'Elbow' },
    { value: 'Humerus', label: 'Humerus' },
    { value: 'Forearm', label: 'Forearm' },
    { value: 'Wrist', label: 'Wrist' }
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
