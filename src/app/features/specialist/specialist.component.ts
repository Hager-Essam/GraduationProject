import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BodyPartService} from '../../core/services/body-part.service';
import {ImageServiceService} from '../../core/services/ImageUploading/image-service.service';
import {ReportService} from '../../core/services/ReportServices/report.service';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss'
})
export class SpecialistComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile!: File;
  isImageUploaded: boolean = false;
  imageId: string = '';

  dropdownControl!: FormControl;

  constructor(
    private imageService: ImageServiceService,
    private reportService: ReportService,
    private router: Router,
    private bodyPartService: BodyPartService
  ) {}

  ngOnInit() {
    this.dropdownControl = new FormControl(this.bodyPartService.getSelectedBodyPart());

    this.dropdownControl.valueChanges.subscribe(value => {
      if (value) {
        this.bodyPartService.setSelectedBodyPart(value);
      }
    });
  }

  get bodyParts() {
    return this.bodyPartService.getBodyParts();
  }

  getSelectedLabel(): string {
    const selectedOption = this.bodyParts.find(opt => opt.value === this.dropdownControl.value);
    return selectedOption ? selectedOption.label : '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageUrl = reader.result;
      this.reportService.setImageUrl(this.imageUrl);
    };
    reader.readAsDataURL(this.selectedFile);

    const selectedBodyPart = this.bodyPartService.getSelectedBodyPart();

    this.imageService.uploadImage(this.selectedFile, selectedBodyPart).subscribe({
      next: (data) => {
        if (data?.success && data.data?.[0]?.is_success) {
          this.imageId = data.data[0].data.id;
          this.reportService.setImageId(this.imageId);
          this.isImageUploaded = true;
        }
      },
      error: (err) => {
        console.error('Upload error:', err);
      }
    });
  }

  onShowReport() {
    if (this.imageId) {
      this.reportService.setImageId(this.imageId);
      this.router.navigate(['/report']);
    }
  }
}
