import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../core/services/dashBoard/dashboard.service';
import {DecimalPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PaymentService} from '../../../core/services/Payment/payment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    NgStyle,
    RouterLink
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
  successColor = '#36A2EB';
  failureColor = '#FF6384';
  deletedSpecPercentage = 0;
  deletedPatPercentage = 0;
  transactions: any[] = [];
  successCount: number = 0;
  failureCount: number = 0;
  successPercentage: number = 0;
  failurePercentage: number = 0;
  totalPayments: number = 0;
  responseMessage: string = '';

  constructor(private dashboardService: DashboardService,
              private paymentService: PaymentService,
  ) {
  }

  ngOnInit() {
    this.loadPatientsCount();
    this.loadSpecialistsCount();
    this.calculateTotalsAndPercentages();
    this.loadDeletedSpecialistsCount();
    this.loadDeletedPatientsCount();
    this.loadTotalPayments();
    this.loadTransactions();
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
        console.log(`Deleted Specialists Number is ${deletedSpecialistsArray.length}`)

        this.animateNumber('deletedPatientsCount', deletedSpecialistsArray.length, 900);
      },
      error: err => {
        console.error('Error loading Patients:', err);
      }
    });
  }

  loadDeletedPatientsCount() {
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
        console.log(`Deleted Patients Number is ${deletedPatientsArray.length}`)

        this.animateNumber('deletedSpecialistsCount', deletedPatientsArray.length, 900);
        console.log(this.deletedPatientsCount);
      },
      error: err => {
        console.error('Error loading Patients:', err);
      }
    });
  }

  calculateTotalsAndPercentages(): void {
    const totalSpecialists = this.specialistsCount + this.deletedSpecialistsCount;

    const totalPatients = this.patientsCount + this.deletedPatientsCount;

    this.totalUsers = totalSpecialists + totalPatients;

    this.specialistsPercentage = totalSpecialists > 0 ? (this.specialistsCount / this.totalUsers) * 100 : 0;
    this.patientsPercentage = totalPatients > 0 ? (this.patientsCount / this.totalUsers) * 100 : 0;

    this.deletedSpecPercentage = totalSpecialists > 0 ? (this.deletedSpecialistsCount / this.totalUsers) * 100 : 0;
    this.deletedPatPercentage = totalPatients > 0 ? (this.deletedPatientsCount / this.totalUsers) * 100 : 0;
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


  loadTotalPayments(): void {
    this.paymentService.getAllPayment().subscribe(
      (response: any) => {
        if (response.success) {
          this.totalPayments = response.data;
          this.responseMessage = response.message;
        } else {
          this.responseMessage = 'Failed to retrieve total payments.';
        }
      },
      error => {
        this.responseMessage = 'An error occurred retrieving payments!';
        console.error(error);
      }
    );
  }


  loadTransactions(): void {
    this.paymentService.getAllTransactions().subscribe(
      (response: any) => {
        this.transactions = response.data;
        this.calculatePercentages();
      },
      error => {
        console.error('Failed to load transactions', error);
      }
    );
  }

  calculatePercentages(): void {
    const totalTransactions = this.transactions.length;
    this.successCount = this.transactions.filter(t => t.paymentStatus === 'success').length;
    this.failureCount = totalTransactions - this.successCount;
    this.successPercentage = (this.successCount / totalTransactions) * 100;
    this.failurePercentage = (this.failureCount / totalTransactions) * 100;
  }


  getBarStyle(percentage: number): { [key: string]: string } {
    let baseColor: string;

    if (percentage <= 10) {
      baseColor = '#FF0000';
    } else if (percentage > 10 && percentage <= 20) {
      baseColor = '#f1ac4d';
    } else if (percentage >20  && percentage <= 30) {
      baseColor = '#d5a767'
    } else if (percentage > 30  && percentage <= 40) {
      baseColor = '#975fad'
    } else if (percentage >40  && percentage <= 50) {
      baseColor = '#51aeff'
    }  else if (percentage > 50  && percentage <= 70) {
      baseColor = '#1db198'
    } else {
      baseColor = '#418ccc';
    }
    return {
      'height': `${percentage}%`,
      'background-color': baseColor
    };
  }

}



