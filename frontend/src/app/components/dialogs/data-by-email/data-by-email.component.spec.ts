import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataByEmailComponent } from './data-by-email.component';

describe('DataByEmailComponent', () => {
  let component: DataByEmailComponent;
  let fixture: ComponentFixture<DataByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataByEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
