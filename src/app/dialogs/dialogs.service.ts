import { Observable } from 'rxjs/Rx';
import { SnackInfoDialog } from './snackinfo.component';
import { EditSnackDialog } from './editsnack.component';
import { RegisterDialog } from './register.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public snackinfo(id: string): Observable<boolean> {

    let dialogRef: MatDialogRef<SnackInfoDialog>;

    dialogRef = this.dialog.open(SnackInfoDialog);
    dialogRef.componentInstance.id = id;

    return dialogRef.afterClosed();
  }

  public editsnack(id: string): Observable<boolean> {

    let dialogRef: MatDialogRef<EditSnackDialog>;

    dialogRef = this.dialog.open(EditSnackDialog);
    dialogRef.componentInstance.id = id;

    return dialogRef.afterClosed();
  }

  public register(): Observable<boolean> {

    let dialogRef: MatDialogRef<RegisterDialog>;

    dialogRef = this.dialog.open(RegisterDialog);

    return dialogRef.afterClosed();
  }
}
