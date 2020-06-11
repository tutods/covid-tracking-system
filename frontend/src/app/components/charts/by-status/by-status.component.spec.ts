import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByStatusComponent } from './by-status.component';

describe('ByStatusComponent', () => {
  let component: ByStatusComponent;
  let fixture: ComponentFixture<ByStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
