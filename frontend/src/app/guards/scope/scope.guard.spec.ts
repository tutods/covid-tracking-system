import { TestBed } from '@angular/core/testing';
import { ScopeGuard } from './scope.guard';


describe('ScopeGuard', () => {
	let guard: ScopeGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(ScopeGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
