import { Observable } from 'rxjs/Rx';
import { MdSnackBar,MdSnackBarRef,SimpleSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  constructor(private snackBar: MdSnackBar) { }

  public send(message: string, action?: string): Observable<void> {

    let messageRef: MdSnackBarRef<SimpleSnackBar>;

    messageRef = this.snackBar.open(message, action?action:"",
      { duration: 7500 }
    );

    return messageRef.onAction();
  }
}