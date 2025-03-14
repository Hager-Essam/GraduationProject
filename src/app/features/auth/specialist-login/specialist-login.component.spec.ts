import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistLoginComponent } from './specialist-login.component';

describe('SpecialistLoginComponent', () => {
  let component: SpecialistLoginComponent;
  let fixture: ComponentFixture<SpecialistLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
