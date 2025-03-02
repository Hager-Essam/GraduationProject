import { Component } from '@angular/core';
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {InputComponent} from "../../../shared/components/input/input.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-forget-password',
  standalone: true,
    imports: [
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule
    ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

}
