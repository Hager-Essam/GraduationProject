import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreSpecialistComponent } from './restore-specialist.component';

describe('RestoreSpecialistComponent', () => {
  let component: RestoreSpecialistComponent;
  let fixture: ComponentFixture<RestoreSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreSpecialistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
