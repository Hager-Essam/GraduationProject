import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgStyle,
    NgIf
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  dropdownOpen = false;

  selectedUserType: any = null;

  userTypes = [
    { label: 'Patient (100)', amount: 100 },
    { label: 'Specialist (200)', amount: 200 },
    { label: 'Guest (500)', amount: 500 }
  ];

  paymentData = {
    phone: '',
    email: '',
    amount: 0
  };

  constructor(private http: HttpClient) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectUserType(user: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedUserType = user;
    this.paymentData.amount = user.amount;
    this.dropdownOpen = false;
  }
  submitPayment() {
    const url = 'https://bones.runasp.net/api/Payment/pay';

    this.http.post<any>(url, this.paymentData).subscribe({
      next: (response) => {
        if (response.iframeUrl) {
          window.location.href = response.iframeUrl;
        } else {
          alert('Payment failed: No iframe URL returned.');
        }
      },
      error: (err) => {
        console.error('Payment Error:', err);
        alert('Payment request failed. Please try again.');
      }
    });
  }
}
