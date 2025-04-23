import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-specialist-register',
  standalone: true,
  templateUrl: './specialist-register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./specialist-register.component.scss']
})
export class SpecialistRegisterComponent implements OnInit {
  form!: FormGroup;
  Role: string = 'specialist';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.Role = params['role'];
      }
    });

    this.form = this.fb.group({
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      CertificateFile: [null, Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^0[0-9]{10}$')]],
      Role: ['specialist']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({ CertificateFile: file });
      this.form.get('CertificateFile')?.updateValueAndValidity();
      console.log('File selected:', this.selectedFile);
    } else {
      console.log('No file selected');
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedFile) {
      console.log("Form invalid or file not selected!");
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        console.log(`${key} - valid: ${control?.valid}, value: ${control?.value}`);
      });
      console.log('File selected:', this.selectedFile);
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const values = this.form.value;

    formData.append('FullName', values.FullName);
    formData.append('Email', values.Email);
    formData.append('Password', values.Password);
    formData.append('ConfirmPassword', values.ConfirmPassword);
    formData.append('PhoneNumber', values.PhoneNumber);
    formData.append('Role', this.Role);
    formData.append('CertificateFile', this.selectedFile);

    this.authService.registerUser(formData).subscribe({
      next: res => {
        console.log('Specialist registered:', res);
        this.router.navigate(['/specialist']);
      },
      error: err => {
        console.error('Registration Failed', err);
        if (err.error) {
          console.error('Error details:', err.error);
        }
      }
    });
  }
}
