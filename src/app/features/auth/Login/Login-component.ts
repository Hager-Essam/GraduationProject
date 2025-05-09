import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgIf, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './Login-component.html',
  styleUrl: './Login-component.scss'
})
export class LoginComponent implements OnInit {
  Role: string = '';
  formLogin!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.Role = this.route.snapshot.paramMap.get('role') || 'specialist';

    this.route.queryParams.subscribe(params => {
      if (params['Role']) {
        this.Role = params['Role'];
      }
    });

    this.formLogin = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      Role: [this.Role]
    });
  }


  onSubmit(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const loginData = {
      Email: this.formLogin.value.Email,
      Password: this.formLogin.value.Password,
      Role: this.Role
    };

    this.AuthService.loginUser(loginData).subscribe({
      next: res => {
        const userProfile = this.AuthService.getUserProfile();
        console.log("User Profile:", userProfile);
        this.AuthService.setUserRole(this.Role);
        if (!userProfile?.phoneNumber) {
          console.warn("Phone number is missing in userData.");
        }

        if (this.Role.toLowerCase() === 'patient') {
          this.router.navigate(['/patient']);
        } else if (this.Role.toLowerCase() === 'specialist') {
          this.router.navigate(['/specialist']);
        } else if (this.Role.toLowerCase() === 'admin') {
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => {
        this.errorMessage = err.message;
        if (err.error) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      }
    });
  }


  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password', this.Role]);
  }

  navigateToRegister() {
    if (this.Role.toLowerCase() === 'patient') {
      this.router.navigate(['/register-patient']);
    } else if (this.Role.toLowerCase() === 'specialist') {
      this.router.navigate(['/register-specialist']);
    }
  }
}
