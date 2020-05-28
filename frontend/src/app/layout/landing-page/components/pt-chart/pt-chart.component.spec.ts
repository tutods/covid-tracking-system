import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtChartComponent } from './pt-chart.component';

describe('PtChartComponent', () => {
  let component: PtChartComponent;
  let fixture: ComponentFixture<PtChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
