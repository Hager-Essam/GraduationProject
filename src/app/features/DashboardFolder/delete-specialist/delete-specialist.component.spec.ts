import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecialistComponent } from './delete-specialist.component';

describe('DeleteSpecialistComponent', () => {
  let component: DeleteSpecialistComponent;
  let fixture: ComponentFixture<DeleteSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSpecialistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
