import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../core/services/dashBoard/dashboard.service';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    FormsModule // Keep this
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent implements OnInit {
  specialists: any[] = [];
  filteredSpecialists: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadSpecialistsCount();
  }

  loadSpecialistsCount() {
    this.dashboardService.getAllSpecialists().subscribe({
      next: specialists => {
        this.specialists = specialists;
        this.filteredSpecialists = [...specialists];
      },
      error: err => {
        console.error('Error loading specialists:', err);
        this.specialists = [];
        this.filteredSpecialists = [];
      }
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

  openChat(doctor: any) {
    this.router.navigate(['/chat'], {state: {doctor}});
  }
}
