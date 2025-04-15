import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TitleCasePipe} from '@angular/common';
import {ApiServiceService} from '../../../core/services/api-service.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    FormsModule
  ],
  templateUrl: './Login-component.html',
  styleUrl: './Login-component.scss'
})
export class LoginComponent implements OnInit {
  role: string = '';
  email: string = '';
  password: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiServiceService) {
  }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
  }

  // onSubmit() {
  //   this.apiService.login('email', 'password').subscribe(
  //     response => {
  //       console.log(response);
  //       this.navigateToUserPage();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

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
