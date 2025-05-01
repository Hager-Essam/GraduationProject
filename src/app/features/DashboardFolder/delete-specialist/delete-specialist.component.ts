import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AdminService} from '../../../core/services/admin/admin.service';

@Component({
  selector: 'app-delete-specialist',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './delete-specialist.component.html',
  styleUrl: './delete-specialist.component.scss'
})
export class DeleteSpecialistComponent implements OnInit{
  specialists: any[] = [];
  responseMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSpecialists();
  }

  loadSpecialists(): void {
    this.adminService.getAllSpecialists().subscribe(
      (data: any[]) => {
        this.specialists = data;
      },
      error => {
        this.responseMessage = 'Failed to load specialists!';
        console.error(error);
      }
    );
  }

  onDeleteSpecialist(id: number): void {
    this.adminService.deleteSpecialist(id).subscribe(
      (response) => {
        this.responseMessage = response.message;
        this.loadSpecialists();
      },
      (error) => {
        this.responseMessage = 'Failed to delete specialist!';
        console.error(error);
      }
    );
  }


}
