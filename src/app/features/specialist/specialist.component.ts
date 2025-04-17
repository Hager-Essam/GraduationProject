import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-specialist',
  standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss'
})
export class SpecialistComponent {
  imageUrl: string | null = null;
  isImageUploaded:boolean = false;
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.isImageUploaded=true;
      };
      reader.readAsDataURL(file);
    }
  }
}
