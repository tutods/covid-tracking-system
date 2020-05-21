import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../session.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {

  emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

  resetForm: FormGroup;

  constructor(public session: SessionService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      'email': new FormControl('',[
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailPattern)
      ])
    })
  }

  get resetFormControl() {
		return this.resetForm.controls;
	}

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {duration: 5000})
  }

  onSubmit(evt){
    //Prevent Default
    evt.preventDefault();

    const email = this.resetForm.get('email').value;

    this.session
      .reset(email)
      .subscribe(
        ()=>{
          this.openSnackBar(`An email was sent to ${email} with sucess!`);
        },
        (error) =>{
          this.openSnackBar(error.error.message);
        }
      )
    
  }


}
