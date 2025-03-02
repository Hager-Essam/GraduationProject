import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {ForgetPasswordComponent} from './features/auth/forget-password/forget-password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, LoginComponent, RegisterComponent, ForgetPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bonesApp';
}
