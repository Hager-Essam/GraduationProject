import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../core/services/Auth/auth.service';
import {UserDataService} from '../../core/services/Auth/userData.service';

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

  constructor(private userData:UserDataService) {
  }

  ngOnInit() {
    this.user = this.userData.getUser();
    console.log(this.user);
  }

  isEditing = false;
  //
  // selectedImage: any = null;
  //
  // toggleEdit() {
  //   this.isEditing = !this.isEditing;
  // }
  //
  // saveChanges() {
  //   this.isEditing = false;
  //   console.log('Updated Patient Data:', this.user);
  // }
  //
  // openImage(xray: any) {
  //   this.selectedImage = xray;
  // }
  //
  // closeImage() {
  //   this.selectedImage = null;
  // }
}
