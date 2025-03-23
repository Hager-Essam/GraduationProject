import { Component } from '@angular/core';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    LoaderComponent
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

}
