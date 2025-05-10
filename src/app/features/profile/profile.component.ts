import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { DashboardService } from '../../core/services/dashBoard/dashboard.service';
import { ProfileService } from '../../core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  role: string = '';
  rating: number | null = null;
  userImages: { imageUrl: string; uploadedAt: Date }[] = [];
  errorMessage: string = '';
  loggedInUserId: string = '';
  selectedImage: { imageUrl: string; uploadedAt: Date } | null = null;
  constructor(private dashboardService: DashboardService,
              private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loggedInUserId = localStorage.getItem('userId') || '';
    const storedUserData = localStorage.getItem('userData');
    const storedRole = localStorage.getItem('role');

    if (storedUserData) {
      this.userProfile = JSON.parse(storedUserData);
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
            }
          },
          error: err => {
            console.error('Error fetching rating:', err);
          }
        });
      }
    }

    this.profileService.getPatientUploadedImages(this.loggedInUserId).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.userImages = res.data.map((img: any) => ({
            imageUrl: 'https://bones.runasp.net' + img.imageUrl.replace(/\\/g, '/'),
            uploadedAt: new Date(img.uploadedAt)
          }));
        } else {
          this.errorMessage = 'No images found.';
        }
      },
      error: err => {
        console.error('Error fetching images:', err);
        this.errorMessage = 'Failed to load images.';
      }
    });
  }
}
