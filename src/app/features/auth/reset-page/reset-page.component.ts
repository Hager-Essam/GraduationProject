import {Component, OnInit} from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Rating} from 'primeng/rating';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
export class ResetPageComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  role: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(`Password reset for ${this.role}`);
    // Call API to reset password (backend logic)

    if (this.role === 'patient') {
      this.router.navigate(['/patient']);
    } else {
      this.router.navigate(['/specialist']);
    }
  }
}
