import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/Auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
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


}
