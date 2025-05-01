import {Component, OnInit} from '@angular/core';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminService} from '../../../core/services/admin/admin.service';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.scss'
})
export class DeletePatientComponent implements OnInit{
  patients: any[] = [];
  responseMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.adminService.getAllPatients().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.patients = response.data;
        } else {
          console.error('Unexpected response structure:', response);
          this.patients = [];
        }
      },
      error => {
        this.responseMessage = 'Failed to load patients!';
        console.error(error);
        this.patients = [];
      }
    );
  }

  onDeletePatient(id: number): void {
    this.adminService.deletePatient(id).subscribe(
      (response) => {
        this.responseMessage = response.message;
        this.loadPatients();
      },
      (error) => {
        this.responseMessage = 'Failed to delete patient!';
        console.error(error);
      }
    );
  }
}
