import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestCreateDialogComponent } from './covid-test-create-dialog.component';

describe('CreateDialogComponent', () => {
  let component: CovidTestCreateDialogComponent;
  let fixture: ComponentFixture<CovidTestCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidTestCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
