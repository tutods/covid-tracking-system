import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestDeleteDialogComponent } from './covid-test-delete-dialog.component';

describe('CovidTestDeleteDialogComponent', () => {
  let component: CovidTestDeleteDialogComponent;
  let fixture: ComponentFixture<CovidTestDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTestDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
