import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../core/services/admin/admin.service';
import {ModelsStatisticsService} from '../../../core/services/ModelsStatistics/models-statistics.service';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-models-statistics',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './models-statistics.component.html',
  styleUrl: './models-statistics.component.scss'
})
export class ModelsStatisticsComponent implements OnInit {
  models: any[] = [];

  constructor(private modelsService: ModelsStatisticsService) {
  }

  ngOnInit() {
    this.loadModelStatistics();
  }

  loadModelStatistics() {
    this.modelsService.getAllModelsStatistics().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.models = response.data;
        } else {
          console.error('Unexpected response structure:', response);
          this.models = [];
        }
      },
    )
  }
}
