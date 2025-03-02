import {Component} from '@angular/core';
import {InputComponent} from "../../../shared/components/input/input.component";
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    username: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get emailIsValid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }


  get passwordIsValid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

