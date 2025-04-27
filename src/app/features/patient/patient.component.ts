import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {ImageServiceService} from '../../core/services/ImageUploading/image-service.service';
import {ReportService} from '../../core/services/ReportServices/report.service';

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

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile!: File;
  isImageUploaded: boolean = false;
  imageId: string = '';


  constructor(private imageService: ImageServiceService,
              private reportService: ReportService,
              private router: Router) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageUrl = reader.result;
      // reader.readAsDataURL(this.selectedFile);
      this.reportService.setImageUrl(this.imageUrl);
    };
    reader.readAsDataURL(this.selectedFile);


    this.imageService.uploadImage(this.selectedFile).subscribe(data => {
      this.imageId = data.id;
      this.reportService.setImageId(this.imageId);
      this.isImageUploaded = true;
    });
  }

  onShowReport() {
    this.reportService.setImageId(this.imageId);
    this.router.navigate(['/report']);
  }
}
