import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../../auth/session.service';
import { UserAddComponent } from './../../components/dialogs/users/user-add/user-add.component';
import { UserDeleteComponent } from './../../components/dialogs/users/user-delete/user-delete.component';
import { UserEditComponent } from './../../components/dialogs/users/user-edit/user-edit.component';
import { UserInfoComponent } from './../../components/dialogs/users/user-info/user-info.component';
import { User } from './../../models/user.model';
import { UsersService } from './../../services/users-service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  users;
  loggedUserEmail: string;

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loggedUserEmail = this.sessionService.me().user.email;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const getAll = this.usersService.getAll();

    return getAll.subscribe((data) => {
      this.users = data;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  openEditDialog(user: User) {
    let dialogRef = this.dialog.open(UserEditComponent, {
      data: user,
      width: '25vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.status == true) {
          this.openSnackBar(result.message);
          this.fetchData();
        } else {
          this.openSnackBar(result.message);
        }
      }
    });
  }

  openDeleteDialog(user: User) {
    let dialogRef = this.dialog.open(UserDeleteComponent, {
      data: user,
      width: '25vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.status == true) {
          this.openSnackBar(result.message);
          this.fetchData();
        } else {
          this.openSnackBar(result.message);
        }
      }
    });
  }

  openInfoDialog(user: User) {
    this.dialog.open(UserInfoComponent, {
      data: user,
      width: '25vw',
    });
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(UserAddComponent, {
      width: '25vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.status == true) {
          this.openSnackBar(result.message);
          this.fetchData();
        } else {
          this.openSnackBar(result.message);
        }
      }
    });
  }
}
