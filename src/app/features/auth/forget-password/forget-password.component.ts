import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    FormsModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email: string = '';
  role: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
  }

  sendCode() {
    console.log(`Sending code to ${this.email}`);
    // Call API to send code (backend logic)

    this.router.navigate([`/code-page/${this.role}`]);
  }
}
