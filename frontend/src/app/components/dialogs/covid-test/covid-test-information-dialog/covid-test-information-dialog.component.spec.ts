import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestInformationDialogComponent } from './covid-test-information-dialog.component';

describe('CovidTestInformationDialogComponent', () => {
  let component: CovidTestInformationDialogComponent;
  let fixture: ComponentFixture<CovidTestInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTestInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
