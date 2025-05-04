import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LogOutComponent} from '../../features/auth/log-out/log-out.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LogOutComponent,
    NgClass
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private router: Router) {
  }
  @Input() isDashboardRoute: boolean = false;

  navigateToLogin(role: string) {
    this.router.navigate(['/login', 'admin']);
    return role;
  }



}
