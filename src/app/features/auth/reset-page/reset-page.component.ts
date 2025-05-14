import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-page.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {
  resetForm!: FormGroup;
  emailFromQuery!: string;
  codeFromQuery!: string;
  loading = false;
  errorMessage = '';
  successMessage = '';
  role: string = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {


    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
    this.emailFromQuery = this.route.snapshot.queryParamMap.get('email') || '';
    this.codeFromQuery = this.route.snapshot.queryParamMap.get('code') || '';

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    if (!this.emailFromQuery || !this.codeFromQuery) {
      this.errorMessage = 'Missing email or code from URL.';
      return;
    }

    const newPassword = this.resetForm.value.newPassword;
    console.log('🔐 Resetting password with:', {
      email: this.emailFromQuery,
      code: this.codeFromQuery,
      newPassword
    });

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post('https://bones.runasp.net/api/Account/ResetPassword', {
      email: this.emailFromQuery,
      code: this.codeFromQuery,
      newPassword
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success) {
          this.successMessage = 'Password has been reset successfully!';
          setTimeout(() => {
            this.router.navigate(['login/:role']);
          }, 2000);
        } else {
          this.errorMessage = res.message || 'Reset failed.';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(' API Error:', err);
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}
