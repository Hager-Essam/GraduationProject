import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
  }

  navigateToLogin(role: string) {
    this.router.navigate(['/login', role]);
  }

}
