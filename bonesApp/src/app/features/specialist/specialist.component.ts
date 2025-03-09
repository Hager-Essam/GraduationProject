import {Component} from '@angular/core';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss'
})
export class SpecialistComponent {
  selectedFile: File | null = null;
  report: any = null;
  errorMessage: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        this.selectedFile = file;
        this.errorMessage = null;
      } else {
        this.selectedFile = null;
        this.errorMessage = 'Only .jpg and .png files are allowed.';
      }
    }
  }
}
