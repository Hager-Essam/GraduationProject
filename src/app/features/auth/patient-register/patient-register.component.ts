import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-patient-register',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './patient-register.component.html',
  styleUrl: './patient-register.component.scss'
})
export class PatientRegisterComponent {

}
