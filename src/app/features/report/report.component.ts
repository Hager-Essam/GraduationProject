import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {DatePipe, DecimalPipe, JsonPipe, NgClass, NgIf} from '@angular/common';
import {ImageServiceService} from '../../core/services/ImageUploading/image-service.service';
import {ReportService} from '../../core/services/ReportServices/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf,
    JsonPipe,
    DatePipe,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit,OnDestroy {
  report: any = null;
  loading = true;
  imageUrl: string | ArrayBuffer | null = null;
  polling = false;
  processingDelayed = false;
  private timer: any;

  constructor(
    private imageService: ImageServiceService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    const id = this.reportService.getImageId();
    this.imageUrl = this.reportService.getImageUrl();

    if (!id) {
      this.loading = false;
      return;
    }
    this.processingDelayed = false;
    this.timer = setTimeout(() => {
      this.processingDelayed = true;
    }, 10000); // 10 seconds

    this.polling = true;
    this.pollForReport(id);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  pollForReport(id: string) {
    this.imageService.getReport(id).subscribe(data => {
      this.report = data;
      this.loading = false;
      if (data.status !== 'Completed') {
        setTimeout(() => this.pollForReport(id), 2000);
      } else {
        this.polling = false;
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    });
  }
}
