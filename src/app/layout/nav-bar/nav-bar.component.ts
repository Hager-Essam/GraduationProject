import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LogOutComponent} from '../../features/auth/log-out/log-out.component';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../../core/services/Auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LogOutComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router,private authService: AuthService) {
  }
  @Input() isDashboardRoute: boolean = false;

  navigateToLogin(role: string) {
    this.router.navigate(['/login', 'admin']);
    return role;
  }

  isLoggedIn = false;
  role: string | null = null;


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.role = this.authService.getUserRole();
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
