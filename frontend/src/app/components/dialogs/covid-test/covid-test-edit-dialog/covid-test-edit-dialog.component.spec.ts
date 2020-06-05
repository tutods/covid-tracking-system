import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestEditDialogComponent } from './covid-test-edit-dialog.component';

describe('CovidTestEditDialogComponent', () => {
  let component: CovidTestEditDialogComponent;
  let fixture: ComponentFixture<CovidTestEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTestEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
