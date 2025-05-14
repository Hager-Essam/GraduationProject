
  import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-code-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './code-page.component.html',
  styleUrls: ['./code-page.component.css']
})
export class CodePageComponent implements OnInit{
  codeForm: FormGroup;
  emailFromQuery: string | null = null;
  errorMessage = '';
  successMessage = '';
  loading = false;
    role: string = '';
    ngOnInit(): void {
      this.role = this.route.snapshot.paramMap.get('role') || 'patient';
    }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');
  }

  verifyCode() {
    if (this.codeForm.invalid) {
      this.codeForm.markAllAsTouched();
      return;
    }

    if (!this.emailFromQuery) {
      this.errorMessage = 'Missing email from URL. Please try again.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { code } = this.codeForm.value;

    this.http.post<any>('https://bones.runasp.net/api/Account/VerifyResetCode', {
      code,
      email: this.emailFromQuery,
    }).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.loading = false;
        if (res.success) {
          this.successMessage = 'Code verified successfully!';
          setTimeout(() => {
            // this.router.navigate([`/reset-page/${this.role}`],
            //   { queryParams: { email: this.emailFromQuery } });
            this.router.navigate(['/reset-page/${this.role}'], {
              queryParams: { email: this.emailFromQuery, code: this.codeForm.value.code }
            });

          }, 1500);
        } else {
          this.errorMessage = res.message || 'Verification failed.';
        }
      },
      error: (err) => {
        this.loading = false;
        // console.error('API Error:', err);
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}
