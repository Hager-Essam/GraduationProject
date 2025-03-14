import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-specialist-register',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './specialist-register.component.html',
  styleUrl: './specialist-register.component.scss'
})
export class SpecialistRegisterComponent {

}
