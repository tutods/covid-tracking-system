import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientAddComponent } from './patient-add.component';


describe('PatientAddComponent', () => {
	let component: PatientAddComponent;
	let fixture: ComponentFixture<PatientAddComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PatientAddComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PatientAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
