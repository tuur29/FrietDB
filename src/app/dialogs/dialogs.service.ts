import { Observable } from 'rxjs/Rx';
import { SnackInfoDialog } from './snackinfo.component';
import { EditSnackDialog } from './editsnack.component';
import { RegisterDialog } from './register.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public snackinfo(reqId: number): Observable<boolean> {

        let dialogRef: MatDialogRef<SnackInfoDialog>;

        dialogRef = this.dialog.open(SnackInfoDialog);
        dialogRef.componentInstance.reqId = reqId;

        return dialogRef.afterClosed();
    }

    public editsnack(editId: number): Observable<boolean> {

        let dialogRef: MatDialogRef<EditSnackDialog>;

        dialogRef = this.dialog.open(EditSnackDialog);
        dialogRef.componentInstance.editId = editId;

        return dialogRef.afterClosed();
    }

    public register(): Observable<boolean> {

        let dialogRef: MatDialogRef<RegisterDialog>;

        dialogRef = this.dialog.open(RegisterDialog);

        return dialogRef.afterClosed();
    }
}
