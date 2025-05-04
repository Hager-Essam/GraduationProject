import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {filter} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GraduationProject';

  isDashboardRoute: boolean = false;

  constructor(private router: Router) {}


}
