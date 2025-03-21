import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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
  role: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
  }

  register() {
    console.log(`Registering as ${this.role}`);
  }


}
