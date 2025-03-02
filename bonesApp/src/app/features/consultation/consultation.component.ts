import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent {

}
