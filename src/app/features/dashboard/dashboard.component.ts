import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../core/services/Auth/dashboard.service';
import {DecimalPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    NgStyle
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  specialistsCount = 0;
  patientsCount = 0;
  deletedSpecialistsCount = 0;
  deletedPatientsCount = 0;
  totalUsers = 0;
  specialistsPercentage = 0;
  patientsPercentage = 0;
  deletedSpecPercentage = 0;
  deletedPatPercentage = 0;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.loadPatientsCount();
    this.loadSpecialistsCount();
    this.calculateTotalsAndPercentages();
    this.loadDeletedSpecialistsCount();
    this.loadDeletedPatientsCount();

  }

  loadSpecialistsCount() {
    this.dashboardService.getAllSpecialists().subscribe({
      next: specialists => {
        this.animateNumber('specialistsCount', specialists.length, 900);
      },
      error: err => {
        console.error('Error loading specialists:', err);
      }
    });
  }

  loadPatientsCount() {
    this.dashboardService.getAllPatients().subscribe({
      next: response => {
        let patientsArray = response;
        if (!Array.isArray(patientsArray)) {
          if ('data' in response && Array.isArray(response.data)) {
            patientsArray = response.data;
          } else if ('results' in response && Array.isArray(response.results)) {
            patientsArray = response.results;
          }
        }
        console.log(`Patients Number is ${this.patientsCount}`)
        this.patientsCount = patientsArray.length;
        // console.log(this.patientsCount);
        this.animateNumber('patientsCount', patientsArray.length, 900);
      },
      error: err => {
        console.error('Error loading Patients:', err);
      }
    });
  }

  loadDeletedSpecialistsCount() {
    this.dashboardService.getAllDeletedPatients().subscribe({
      next: response => {
        let deletedPatientsArray = response;
        if (!Array.isArray(deletedPatientsArray)) {
          if ('data' in response && Array.isArray(response.data)) {
            deletedPatientsArray = response.data;
          } else if ('results' in response && Array.isArray(response.results)) {
            deletedPatientsArray = response.results;
          }
        }
        console.log(`Patients Number is ${deletedPatientsArray.length}`)

        this.animateNumber('deletedPatientsCount', deletedPatientsArray.length, 900);
      },
      error: err => {
        console.error('Error loading Patients:', err);
      }
    });
  }

  loadDeletedPatientsCount() {
    this.dashboardService.getAllDeletedSpecialists().subscribe({
      next: response => {
        let deletedSpecialistsArray = response;
        if (!Array.isArray(deletedSpecialistsArray)) {
          if ('data' in response && Array.isArray(response.data)) {
            deletedSpecialistsArray = response.data;
          } else if ('results' in response && Array.isArray(response.results)) {
            deletedSpecialistsArray = response.results;
          }
        }
        console.log(`Patients Number is ${deletedSpecialistsArray.length}`)

        this.animateNumber('deletedSpecialistsCount', deletedSpecialistsArray.length, 900);
      },
      error: err => {
        console.error('Error loading Patients:', err);
      }
    });
  }

  calculateTotalsAndPercentages() {
    this.totalUsers = this.specialistsCount + this.patientsCount;
    this.specialistsPercentage = this.totalUsers > 0 ? (this.specialistsCount / this.totalUsers) * 100 : 0;
    this.patientsPercentage = this.totalUsers > 0 ? (this.patientsCount / this.totalUsers) * 100 : 0;
    this.deletedSpecPercentage = this.specialistsCount > 0 ? (this.deletedSpecPercentage / this.specialistsCount) * 100 : 0;
    this.deletedPatPercentage = this.patientsCount > 0 ? (this.deletedPatPercentage / this.patientsCount) * 100 : 0;
  }

  animateNumber(field: 'specialistsCount' | 'patientsCount' | 'deletedSpecialistsCount' | 'deletedPatientsCount', target: number, duration: number) {
    let start = 0;
    if (target === 0) {
      (this as any)[field] = 0;
      this.calculateTotalsAndPercentages();
      return;
    }
    const stepTime = Math.abs(Math.floor(duration / target));
    const step = () => {
      start++;
      (this as any)[field] = start;
      this.calculateTotalsAndPercentages();
      if (start < target) {
        setTimeout(step, stepTime);
      } else {
        (this as any)[field] = target;
        this.calculateTotalsAndPercentages();
      }
    };
    step();
  }


}
