import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsChartComponent } from './pets-chart.component';

describe('PetChartComponent', () => {
  let component: PetsChartComponent;
  let fixture: ComponentFixture<PetsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
