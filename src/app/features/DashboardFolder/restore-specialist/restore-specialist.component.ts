import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../core/services/admin/admin.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-restore-specialist',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './restore-specialist.component.html',
  styleUrl: './restore-specialist.component.scss'
})
export class RestoreSpecialistComponent implements OnInit {
  deletedSpecialists: any[] = [];
  responseMessage: string = '';

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.loadDeletedSpecialists();
  }

  loadDeletedSpecialists(): void {
    this.adminService.getDeletedSpecialist().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.deletedSpecialists = response.data;
        } else {
          console.error('Unexpected response structure:', response);
          this.deletedSpecialists = [];
        }
      },
      error => {
        this.responseMessage = 'No specialist to restore now!!';
        console.error(error);
        this.deletedSpecialists = [];
      }
    );
  }

  onRestoreSpecialist(id: number): void {
    this.adminService.restoreSpecialist(id).subscribe(
      (response) => {
        this.responseMessage = 'Specialist restored successfully!';
        this.loadDeletedSpecialists();
        // console.log('This is the messsage'+response.message);
      },
      (error) => {
        this.responseMessage = 'Failed to restore Specialist!';
        console.error(error);
      }
    );
  }
}
