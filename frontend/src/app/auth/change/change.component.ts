import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.sass'],
})
export class ChangeComponent implements OnInit {
  changeForm: FormGroup;

  private token: string;

  constructor(
    public session: SessionService,
    public router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.changeForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

  // To disable button if have errors	
  get changeFormControl() {
    return this.changeForm.controls;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  

  onSubmit(evt) {
    evt.preventDefault();

    this.session.change(
      this.changeForm.get('newPassword').value,
      this.changeForm.get('confirmPassword').value,
      this.token
    );

    this.router.navigateByUrl('/login');
  }
}