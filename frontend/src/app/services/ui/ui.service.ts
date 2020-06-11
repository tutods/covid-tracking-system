import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
	providedIn: 'root'
})
export class UiService {

	constructor(public snackBar: MatSnackBar) { }

	showSnackBar(message, button = 'OK', duration = 3000) {
		return this.snackBar.open(message, button, { duration: duration })
	}
}
