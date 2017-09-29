import { Observable } from 'rxjs/Rx';
import { SnackInfoDialog } from './snackinfo.component';
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
}