import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestComponent } from './covid-test.component';

describe('CovidTestComponent', () => {
  let component: CovidTestComponent;
  let fixture: ComponentFixture<CovidTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
