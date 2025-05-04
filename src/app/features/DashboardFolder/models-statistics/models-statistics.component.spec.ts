import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsStatisticsComponent } from './models-statistics.component';

describe('ModelsStatisticsComponent', () => {
  let component: ModelsStatisticsComponent;
  let fixture: ComponentFixture<ModelsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
