import {Component, OnInit} from '@angular/core';
import {RouterLink, Router, ActivatedRoute} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../core/services/Auth/auth.service';


export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('Password')?.value;
    const confirmPassword = group.get('ConfirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  };
}

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
export class PatientRegisterComponent implements OnInit {
  form!: FormGroup;
  Role: string = 'Patient';
  apiError: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.Role = params['role'];
      }
    });


    this.form = this.fb.group({
      FullName: ['', Validators.required,Validators.maxLength(20)],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^0[0-9]{10}$')]],
      Role: ['patient']
    }, {Validators: passwordMatchValidator()});
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.apiError = null;
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
    if (values.Password !== values.ConfirmPassword) {
      this.errorMessage = "Password and confirm do not match.";
      return;
    }
    formData.append('FullName', values.FullName);
    formData.append('Email', values.Email);
    formData.append('Password', values.Password);
    formData.append('ConfirmPassword', values.ConfirmPassword);
    formData.append('PhoneNumber', values.PhoneNumber);
    formData.append('Role', 'patient');

    // console.log('Form Data:', formData);

    this.authService.registerUser(formData).subscribe({
      next: res => {
        this.errorMessage = null;
        console.log('Patient registered:', res);
        const user = {
          fullName: values.FullName,
          email: values.Email,
          phoneNumber: values.PhoneNumber,
          role: 'patient'
        };
        this.router.navigate(['/patient']);
      },
      error: err => {
        console.error('Registration Failed', err);
        this.errorMessage = err;

      }
    });
  }

  navigateToLogin(role: string) {
    this.router.navigate(['/login', role]);
    return role;
  }
  onFullNameInput(): void {
    const control = this.form.get('FullName');
    if (control && control.value.length > 20) {
      control.setValue(control.value.slice(0, 20));
    }
  }


}
