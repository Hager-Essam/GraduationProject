import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {DatePipe, DecimalPipe, JsonPipe, NgClass, NgIf} from '@angular/common';
import {ImageServiceService} from '../../core/services/ImageUploading/image-service.service';
import {ReportService} from '../../core/services/ReportServices/report.service';
import {AuthService} from '../../core/services/Auth/auth.service';
import {Subscription} from 'rxjs';
import {SharedService} from '../../core/services/shared.service';

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
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  private timer: any;
  imageUrl: string | ArrayBuffer | null = null;
  processingDelayed = false;
  polling = false;
  loading = true;
  report: any = null;
  userId: string = '';

  constructor(
    private imageService: ImageServiceService,
    private reportService: ReportService,
  ) {
  }

  ngOnInit() {

    const id = this.imageService.getCurrentImageId();
    this.imageUrl = this.reportService.getImageUrl();
    console.log('Received image ID:', id);
    // console.log('Current image URL:', this.reportService.getImageUrl());
    if (!id) {
      this.loading = false;
      return;
    }

    this.processingDelayed = false;
    this.timer = setTimeout(() => {
      this.processingDelayed = true;
    }, 10000);

    this.polling = true;
    this.pollForReport(id);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  pollForReport(id: string) {
    console.log(`Starting polling for report ID: ${id}`);

    this.imageService.getImageReport(id).subscribe({
      next: (response) => {
        console.log('Polling response:', response);

        if (response?.success && response.data) {
          this.report = response.data;

          if (response.data.status === 'Completed') {
            console.log('Report completed:', response.data);
            this.handleReportCompletion();
          } else {
            console.log(`Report status: ${response.data.status}, continuing polling...`);
            setTimeout(() => this.pollForReport(id), 2000);
          }
        } else {
          console.error('Invalid response structure:', response);
          this.handleErrorState();
        }
      },
      error: (err) => {
        console.error('Polling error:', err);
        this.handleErrorState();
      }
    });
  }

  private handleReportCompletion() {
    this.polling = false;
    this.loading = false;
    this.processingDelayed = false;
    if (this.timer) clearTimeout(this.timer);
    console.log('Report processing complete!');
  }

  private handleErrorState() {
    this.loading = false;
    this.polling = false;
    if (this.timer) clearTimeout(this.timer);
  }}
