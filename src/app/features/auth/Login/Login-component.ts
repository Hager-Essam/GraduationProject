import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './Login-component.html',
  styleUrl: './Login-component.scss'
})
export class LoginComponent {
  role: string = '';
  email: string = '';
  password: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient'; // Default to 'patient' if not provided
  }

  login() {
    console.log(`Logging in as ${this.role}`);
    // Authentication logic here
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password', this.role]);
  }

  navigateToRegister() {
    if (this.role === 'patient') {
      this.router.navigate(['/register-patient']);
    } else if (this.role === 'specialist') {
      this.router.navigate(['/register-specialist']);
    }
  }

  navigateToUserPage() {
    if (this.role === 'patient') {
      this.router.navigate(['/patient']);
    } else {
      this.router.navigate(['/specialist']);
    }
  }

}
