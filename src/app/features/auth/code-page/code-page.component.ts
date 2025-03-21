import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {isPlatformBrowser, NgForOf, TitleCasePipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-code-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './code-page.component.html',
  styleUrl: './code-page.component.scss'
})
export class CodePageComponent {
  otp: string[] = new Array(4).fill('');
  timer: number = 50;
  interval: any;
  isBrowser: boolean;
  code: string = '';
  role: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router, private route: ActivatedRoute) {
    // Check if running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startTimer();
    }

    this.role = this.route.snapshot.paramMap.get('role') || 'patient';

  }

  // Auto-focus next OTP input (Only works in browser)
  handleInput(event: Event, index: number) {
    if (this.isBrowser) {
      const input = event.target as HTMLInputElement;
      if (input.value.length === 1 && index < this.otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index}`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }


  verifyCode() {
    console.log(`Verifying code: ${this.code}`);
    // Call API to verify the code (backend logic)
    this.router.navigate([`/reset-page/${this.role}`]);
  }

}
