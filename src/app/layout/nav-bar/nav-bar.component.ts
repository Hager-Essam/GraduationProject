import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LogOutComponent} from '../../features/auth/log-out/log-out.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LogOutComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private router: Router) {
  }

  navigateToLogin(role: string) {
    this.router.navigate(['/login', 'admin']);
    return role;
  }
}
