import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  email: string = '';
  role: string = '';
  message: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
  }

  sendCode() {
    if (!this.email.trim()) {
      this.error = 'Email is required';
      return;
    }

    this.authService.forgetPassword(this.email).subscribe({
      next: (res) => {
        if (res.success) {
          this.message = res.message;
          this.router.navigate(['/code-page/${this.role}'], { queryParams: { email: this.email } });

          // this.router.navigate([`/code-page/${this.role}`]);
        } else {
          this.error = res.message || 'Failed to send code';
        }
      },
      error: (err) => {
        this.error = 'An error occurred while sending the code';
        console.error(err);
      }
    });
  }



}
