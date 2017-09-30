import { Observable } from 'rxjs/Rx';
import { SnackInfoDialog } from './snackinfo.component';
import { RegisterDialog } from './register.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public snackinfo(reqId: number): Observable<boolean> {

        let dialogRef: MdDialogRef<SnackInfoDialog>;

        dialogRef = this.dialog.open(SnackInfoDialog);
        dialogRef.componentInstance.reqId = reqId;

        return dialogRef.afterClosed();
    }

    public register(): Observable<boolean> {

        let dialogRef: MdDialogRef<RegisterDialog>;

        dialogRef = this.dialog.open(RegisterDialog);

        return dialogRef.afterClosed();
    }
}