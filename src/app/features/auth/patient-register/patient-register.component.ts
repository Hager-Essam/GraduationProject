import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './patient-register.component.html',
  styleUrl: './patient-register.component.scss'
})
export class PatientRegisterComponent {

}
