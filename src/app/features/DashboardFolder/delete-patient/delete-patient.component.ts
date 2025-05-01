import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminService} from '../../../core/services/admin/admin.service';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.scss'
})
export class DeletePatientComponent {
  patientId: number = 0;
  specialisttId: number = 0;
  responseMessage: string = '';

  constructor(private adminService: AdminService) {
  }

  onDeletePatient(): void {
    this.adminService.deletePatient(this.patientId).subscribe(
      (response) => {
        this.responseMessage = response.message;
      },
      (error) => {
        if (error.status === 404) {
          this.responseMessage = 'No specialist found with this ID';
        } else {
          this.responseMessage = 'An error occurred while deleting the patient';
        }
      }
    );
  }
  onDeleteSpecialist(): void {
    this.adminService.deleteSpecialist(this.specialisttId).subscribe(
      (response) => {
        this.responseMessage = response.message;
      },
      (error) => {
        if (error.status === 404) {
          this.responseMessage = 'No specialist found with this ID';
        } else {
          this.responseMessage = 'An error occurred while deleting the patient';
        }
      }
    );
  }
}
