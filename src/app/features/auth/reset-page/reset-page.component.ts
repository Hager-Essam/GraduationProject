import { Component } from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Rating} from 'primeng/rating';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-reset-page',
  standalone: true,
  imports: [
    Button,
    FloatLabel,
    FormsModule,
    InputText,
    Rating,
    RouterLink
  ],
  templateUrl: './reset-page.component.html',
  styleUrl: './reset-page.component.scss'
})
export class ResetPageComponent {

}
