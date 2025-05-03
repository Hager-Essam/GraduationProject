import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePatientComponent } from './restore-patient.component';

describe('RestorePatientComponent', () => {
  let component: RestorePatientComponent;
  let fixture: ComponentFixture<RestorePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestorePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestorePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
