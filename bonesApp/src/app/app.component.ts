import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {LoginComponent} from './features/auth/Login/login.component';
import {RegisterComponent} from './features/auth/PatientRegister/register.component';
import {ForgetPasswordComponent} from './features/auth/forget-password/forget-password.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, LoginComponent, RegisterComponent, ForgetPasswordComponent, MatToolbar, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'bonesApp';
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('darkMode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  ngOnInit() {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    this.isDarkMode = savedMode;
    document.body.classList.toggle('darkMode', savedMode);
  }

}
