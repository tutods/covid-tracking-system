import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByGenderComponent } from './by-gender.component';

describe('ByGenderComponent', () => {
  let component: ByGenderComponent;
  let fixture: ComponentFixture<ByGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
