import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  isDarkMode = false;
  name ="PatientName";
  email = "PatientEmail";
  phoneNumber = "PhoneNumber";
  address = "address";
  age ="age";
  gender ="Gender";

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode ? savedMode === 'true' : prefersDark;
    this.applyTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();

    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private applyTheme() {
    document.body.classList.toggle('darkMode', this.isDarkMode);
  }
}




