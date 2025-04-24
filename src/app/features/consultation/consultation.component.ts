import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {state} from '@angular/animations';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent {

  constructor(private router:Router) {
  }
  doctors = [
    { name: 'Dr. User1', email: 'User1@gmail.com', image: 'doctor.png' },
    { name: 'Dr. User2', email: 'User2@gmail.com', image: 'doctor.png' },
    { name: 'Dr. User3', email: 'User2@gmail.com', image: 'doctor.png' },
    { name: 'Dr. User4', email: 'User2@gmail.com', image: 'doctor.png' },
    { name: 'Dr. User5', email: 'User2@gmail.com', image: 'doctor.png' }
  ];
  openChat(doctor: any) {
    this.router.navigate(['/chat'], { state: { doctor } });
  }
}
