import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
  imageUrl: string | null = null;
  isImageUploaded: boolean = false;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.isImageUploaded = true;
        // console.log('Image uploaded:', this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}
