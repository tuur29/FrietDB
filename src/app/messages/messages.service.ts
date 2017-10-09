import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  constructor(private snackBar: MatSnackBar) { }

  public send(message: string, action?: string): Observable<void> {

    let messageRef: MatSnackBarRef<SimpleSnackBar>;

    messageRef = this.snackBar.open(message, action ? action : '',
      { duration: 7500 }
    );

    return messageRef.onAction();
  }
}
