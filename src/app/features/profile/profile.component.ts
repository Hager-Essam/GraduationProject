import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../core/services/Auth/auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log(`This is the user Id  ${this.authService.getUserId()}`);
  }

}
