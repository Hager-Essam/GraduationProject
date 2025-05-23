import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../core/services/admin/admin.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent implements OnInit{
  emails: any[] = [];
  responseMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.adminService.getAllSpecialistsEmails().subscribe(
      (response: any) => {
        this.emails = response.data;
      },
      error => {
        this.responseMessage = 'Failed to load emails!';
        console.error(error);
      }
    );
  }
}
