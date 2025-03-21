import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

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
export class ProfileComponent {
  isEditing = false;
  patient = {
    name: 'Hager Essam',
    phone: '123-456-789',
    email: 'hager.essam@example.com'
  };

  xrayHistory = [
    {imageUrl: 'left-arm.png', report: 'Fracture detected in left arm.'},
    {imageUrl: 'head.png', report: 'No Fractures found.'},
    {imageUrl: 'chest.png', report: 'Fractured'}, {imageUrl: 'left-arm.png', report: 'Fracture detected in left arm.'},
    {imageUrl: 'head.png', report: 'No Fractures found.'},
    {imageUrl: 'chest.png', report: 'Fractured'}, {imageUrl: 'left-arm.png', report: 'Fracture detected in left arm.'},
    {imageUrl: 'head.png', report: 'No Fractures found.'},
    {imageUrl: 'chest.png', report: 'Fractured'}, {imageUrl: 'left-arm.png', report: 'Fracture detected in left arm.'},
    {imageUrl: 'head.png', report: 'No Fractures found.'},
    {imageUrl: 'chest.png', report: 'Fractured'},
  ];

  selectedImage: any = null;

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
    console.log('Updated Patient Data:', this.patient);
  }

  openImage(xray: any) {
    this.selectedImage = xray;
  }

  closeImage() {
    this.selectedImage = null;
  }
}
