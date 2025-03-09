import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-specialist-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './specialist-login.component.html',
  styleUrl: './specialist-login.component.scss'
})
export class SpecialistLoginComponent {

}
