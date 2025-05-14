import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {isPlatformBrowser, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/Auth/auth.service';


@Component({
  selector: 'app-code-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    TitleCasePipe,
    NgIf,
  ],
  templateUrl: './code-page.component.html',
  styleUrl: './code-page.component.scss'
})
export class CodePageComponent implements OnInit{
  email: string = '';
  otp: string[] = ['', '', '', ''];
  role: string = '';
  timer: number = 30;
  message: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      }
    }, 1000);
  }

  handleInput(event: any, index: number) {
    const value = event.target.value;
    if (value && index < this.otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  verifyCode() {
    const code = this.otp.join('');
    if (!code || code.length !== 4) {
      this.error = 'Please enter the full 4-digit code';
      return;
    }

    this.authService.verifyResetCode(this.email, code).subscribe({
      next: (res) => {
        if (res.success) {
          this.message = 'Code verified successfully';
          this.router.navigate([`/reset-password/${this.role}`]);
        } else {
          this.error = res.message || 'Failed to verify code';
        }
      },
      error: (err) => {
        this.error = 'An error occurred while verifying the code';
        console.error(err);
      }
    });
  }
}

