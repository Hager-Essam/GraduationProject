import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) {}

  navigateToLogin(role: string) {
    const isLoggedIn = this.authService.getToken() !== null;
    const userRole = this.authService.getUserRole();

    if (isLoggedIn && userRole?.toLowerCase() === role.toLowerCase()) {
      switch (role.toLowerCase()) {
        case 'patient':
          this.router.navigate(['/patient']);
          break;
        case 'specialist':
          this.router.navigate(['/specialist']);
          break;
        case 'admin':
          this.router.navigate(['/dashboard']);
          break;
        default:
          this.router.navigate(['/home']);
          break;
      }
    } else {
      // Navigate with path param: login/:role
      this.router.navigate(['/login', role]);
    }
  }

  public animatedText = 'Take the next step toward better bone health. Upload your X-ray for analysis, explore your reports or connect with a specialist for personalized care.';

  get lettersArray() {
    return this.animatedText.split('');
  }
}
