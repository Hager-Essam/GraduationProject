import { Component } from '@angular/core';
import {InputComponent} from '../../../shared/components/input/input.component';
import {ButtonComponent} from '../../../shared/components/button/button.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [    InputComponent,

    ButtonComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

}
