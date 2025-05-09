import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../../core/services/dashBoard/dashboard.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedService} from '../../core/services/shared.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    NgClass
  ],
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  specialists: any[] = [];
  filteredSpecialists: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private sharedService:SharedService
  ) {
  }

  ngOnInit(): void {
    this.loadSpecialistsCount();
  }

  loadSpecialistsCount() {
    this.dashboardService.getAllSpecialists().subscribe({
      next: specialists => {
        this.specialists = specialists.map(specialist => ({...specialist, rating: null}));
        this.filteredSpecialists = [...this.specialists];
        this.updateSpecialistsWithRatings();
      },
      error: err => {
        console.error('Error loading specialists:', err);
        this.specialists = [];
        this.filteredSpecialists = [];
      }
    });
  }

  updateSpecialistsWithRatings() {
    this.specialists.forEach(specialist => {
      this.dashboardService.getSpecialistRating(specialist.id).subscribe({
        next: response => {
          if (response.success) {
            specialist.rating = response.data;
            console.log(specialist.id + '   ' + specialist.rating);

          } else {
            console.error(`Failed to retrieve rating for specialist ${specialist.id}: ${response.message}`);
          }
        },
        error: err => {
          console.error(`Error loading rating for specialist ${specialist.id}:`, err);
        }
      });
    });
  }

  filterSpecialists() {
    if (!this.searchTerm) {
      this.filteredSpecialists = [...this.specialists];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredSpecialists = this.specialists.filter(specialist =>
      (specialist.name && specialist.name.toLowerCase().includes(term)) ||
      (specialist.email && specialist.email.toLowerCase().includes(term))
    );
  }

  specId: number | null = null

  openChat(doctor: any) {
    this.router.navigate(['/chat', doctor.userId]);
    console.log(doctor.userId)
    this.specId = doctor.id;
    this.sharedService.changeSpecId(this.specId);
    console.log('Doctor  Id is :' + this.specId);
  }
}
