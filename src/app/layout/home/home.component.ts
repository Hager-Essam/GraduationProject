import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/Auth/auth.service';
import {NgForOf} from '@angular/common';

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

  constructor(private router: Router,private AuthService:AuthService) {
  }

  navigateToLogin(role: string) {
    this.router.navigate(['/login',role]);
    return role;
  }
  public animatedText = 'Take the next step toward better bone health. Upload your X-ray for analysis, explore your reports or connect with a specialist for personalized care.';

  get lettersArray() {
    return this.animatedText.split('');
  }

}
