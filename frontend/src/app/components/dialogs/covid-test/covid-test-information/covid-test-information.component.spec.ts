import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovidTestInformationComponent } from './covid-test-information.component';


describe('CovidTestInformationComponent', () => {
	let component: CovidTestInformationComponent;
	let fixture: ComponentFixture<CovidTestInformationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CovidTestInformationComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CovidTestInformationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
