import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldChartComponent } from './world-chart.component';

describe('WorldChartComponent', () => {
  let component: WorldChartComponent;
  let fixture: ComponentFixture<WorldChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
