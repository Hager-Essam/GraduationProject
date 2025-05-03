import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AdminService} from '../../../core/services/admin/admin.service';

@Component({
  selector: 'app-restore-patient',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './restore-patient.component.html',
  styleUrl: './restore-patient.component.scss'
})
export class RestorePatientComponent {
  deletedPatients: any[] = [];
  responseMessage: string = '';

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.loadDeletedPatients();
  }

  loadDeletedPatients(): void {
    this.adminService.getDeletedPatients().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.deletedPatients = response.data;
        } else {
          console.error('Unexpected response structure:', response);
          this.deletedPatients = [];
        }
      },
      error => {
        this.responseMessage = 'Failed to load patients!';
        console.error(error);
        this.deletedPatients = [];
      }
    );
  }

  onRestorePatient(id: number): void {
    this.adminService.restorePatients(id).subscribe(
      (response) => {
        this.responseMessage = 'Patient restored successfully!';
        this.loadDeletedPatients();
      },
      (error) => {
        this.responseMessage = 'Failed to restore Patient!';
        console.error(error);
      }
    );
  }
}
