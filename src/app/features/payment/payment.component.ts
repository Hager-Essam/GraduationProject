import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  userTypes = [
    { label: 'Patient - 100', amount: 100 },
    { label: 'Specialist - 200 ', amount: 200 },
    { label: 'Premium - 500', amount: 500 }
  ];

  selectedUserType: string = 'Patient - 100';

  paymentData = {
    amount: 10,
    email: '',
    phone: ''
  };

  constructor(private http: HttpClient) {}

  updateAmount() {
    const selected = this.userTypes.find(user => user.label === this.selectedUserType);
    this.paymentData.amount = selected ? selected.amount : 0;
  }

  submitPayment() {
    this.http.post<any>('https://bones.runasp.net/api/Payment/pay', this.paymentData)
      .subscribe({
        next: (response) => {
          if (response.iframeUrl) {
            window.location.href = response.iframeUrl;
          } else {
            alert('Payment failed: No redirect URL received.');
          }
        },
        error: (error) => {
          console.error('Payment error', error);
          alert('Payment failed. Please try again.');
        }
      });
  }
}
