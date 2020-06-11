import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BySymptomsComponent } from './by-symptoms.component';

describe('BySymptomsComponent', () => {
  let component: BySymptomsComponent;
  let fixture: ComponentFixture<BySymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BySymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BySymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
