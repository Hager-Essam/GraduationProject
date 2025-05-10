import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardService} from '../../core/services/dashBoard/dashboard.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  role: string = '';
  rating: number | null = null;
  userImages: string[] = [];
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService,) {
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    const storedRole = localStorage.getItem('role');
    if (storedUserData) {
      this.userProfile = JSON.parse(storedUserData);
      console.log('User Profile:', this.userProfile);

    }

    if (storedRole) {
      this.role = storedRole.toLowerCase();
    }

    if (this.role === 'specialist') {
      const specialistId = this.userProfile?.id;
      if (specialistId) {
        this.dashboardService.getSpecialistRating(specialistId).subscribe({
          next: response => {
            if (response.success) {
              this.rating = response.data;
              console.log('Specialist rating:', this.rating);
            } else {
              console.error('Failed to load rating:', response.message);
            }
          },
          error: err => {
            console.error('Error fetching rating:', err);
          }
        });
      }
    }
  }

}
