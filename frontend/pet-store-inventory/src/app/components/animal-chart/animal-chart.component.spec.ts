import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalChartComponent } from './animal-chart.component';

describe('AnimalChartComponent', () => {
  let component: AnimalChartComponent;
  let fixture: ComponentFixture<AnimalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
