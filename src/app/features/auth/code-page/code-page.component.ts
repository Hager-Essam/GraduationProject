import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-code-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './code-page.component.html',
  styleUrl: './code-page.component.scss'
})
export class CodePageComponent {
  otp: string[] = new Array(4).fill('');
  timer: number = 50;
  interval: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Check if running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startTimer();
    }
  }

  // Auto-focus next OTP input (Only works in browser)
  handleInput(event: Event, index: number) {
    if (this.isBrowser) {
      const input = event.target as HTMLInputElement;
      if (input.value.length === 1 && index < this.otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index }`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  }

  // Start countdown timer
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
