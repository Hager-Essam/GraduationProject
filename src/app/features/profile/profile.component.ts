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
  userImages: string[] = []; // Array to store image URLs
  isLoadingImages: boolean = false;
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    const storedRole = localStorage.getItem('role');

    if (storedUserData) {
      this.userProfile = JSON.parse(storedUserData);
      console.log('User Profile:', this.userProfile);
      this.loadUserImages(); // Load images after getting user profile
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

  loadUserImages(): void {
    if (!this.userProfile?.id) return;

    this.isLoadingImages = true;
    this.errorMessage = '';

    this.dashboardService.getUserImages(this.userProfile.id).subscribe({
      next: (response) => {
        this.isLoadingImages = false;
        if (response.success && response.data) {
          this.userImages = response.data; // Assuming the API returns an array of image URLs
        } else {
          this.errorMessage = response.details || 'No images found';
        }
      },
      error: (err) => {
        this.isLoadingImages = false;
        this.errorMessage = 'Failed to load images. Please try again later.';
        console.error('Error fetching images:', err);
      }
    });
  }
}
