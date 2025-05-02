import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../../../core/services/Payment/payment.service';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-payment-transactions',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './payment-transactions.component.html',
  styleUrl: './payment-transactions.component.scss'
})
export class PaymentTransactionsComponent implements OnInit {
  transactions: any[] = [];
  successCount: number = 0;
  failureCount: number = 0;
  successPercentage: number = 0;
  failurePercentage: number = 0;

  constructor(private transactionService: PaymentService) {
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
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
    const baseColor = percentage > 50 ? '#4CAF50' : '#FF5722';
    return {
      'height': `${percentage}%`,
      'background-color': baseColor
    };
  }

}
