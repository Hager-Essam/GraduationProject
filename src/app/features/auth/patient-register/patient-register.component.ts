import {Component, OnInit} from '@angular/core';
import {RouterLink,Router,ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../core/services/Auth/auth.service';


@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './patient-register.component.html',
  styleUrl: './patient-register.component.scss'
})
export class PatientRegisterComponent implements OnInit{
  form!: FormGroup;
  Role: string = 'Patient';
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router,
              private route :ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.Role = params['Role'];
      }
    });

    // console.log("Component loaded");

    this.form = this.fb.group({
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^0[0-9]{10}$')]],
      Role: ['patient']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log("Form invalid!");
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        console.log(`${key} - valid: ${control?.valid}, value: ${control?.value}`);
      });
      this.form.markAllAsTouched();
      return;
    }

    // console.log("There is no error");

    const formData = new FormData();
    const values = this.form.value;

    formData.append('FullName', values.FullName);
    formData.append('Email', values.Email);
    formData.append('Password', values.Password);
    formData.append('ConfirmPassword', values.ConfirmPassword);
    formData.append('PhoneNumber', values.PhoneNumber);
    formData.append('Role', 'patient');

    // console.log('Form Data:', formData);

    this.authService.registerUser(formData).subscribe({
      next: res => {
        console.log('Patient registered:', res);
        this.router.navigate(['/patient']);
      },
      error: err => {
        console.error('Registration Failed', err);
        if (err.error) {
          console.error('Error details:', err.error);
        }
      }
    });
  }
  navigateToLogin(role: string) {
    this.router.navigate(['/login',role]);
    return role;
  }

}
