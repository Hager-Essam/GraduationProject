import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../core/services/admin/admin.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Specialist} from '../../../core/Models/Specialist';

@Component({
  selector: 'app-verify-specialist',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './verify-specialist.component.html',
  styleUrl: './verify-specialist.component.scss'
})
export class VerifySpecialistComponent implements OnInit {
  specialists: Specialist[] = [];
  selectedSpecialist?: Specialist;
  imageBaseUrl = 'https://bones.runasp.net';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadSpecialists();
  }

  loadSpecialists() {
    this.adminService.getUnverifiedSpecialists().subscribe((res) => {
      this.specialists = res.data;
    });
  }

  onVerifyClick(specialist: Specialist) {
    this.selectedSpecialist = specialist;
  }

  acceptSpecialist() {
    if (!this.selectedSpecialist) return;
    this.adminService.acceptSpecialist(this.selectedSpecialist.id).subscribe(() => {
      this.specialists = this.specialists.filter(s => s.id !== this.selectedSpecialist?.id);
      this.selectedSpecialist = undefined;
    });
  }

  cancel() {
    this.selectedSpecialist = undefined;
  }
}
