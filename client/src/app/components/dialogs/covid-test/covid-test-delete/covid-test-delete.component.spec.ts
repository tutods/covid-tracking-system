import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovidTestDeleteComponent } from './covid-test-delete.component';


describe('CovidTestDeleteComponent', () => {
	let component: CovidTestDeleteComponent;
	let fixture: ComponentFixture<CovidTestDeleteComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CovidTestDeleteComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CovidTestDeleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
