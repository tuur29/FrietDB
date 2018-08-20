import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  constructor(private snackBar: MatSnackBar, ) { }

  public send(message: string, action?: string, duration?: number): Observable<void> {

    let messageRef: MatSnackBarRef<SimpleSnackBar>;
    messageRef = this.snackBar.open(message, action ? action : '',
      { duration: duration || 7500 }
    );
    return messageRef.onAction();
  }

  public sendServerError(noAction?: boolean) {
    this.send("Deze pagina bestaat niet meer!", noAction ? '' : 'HERLADEN', 1000*60*60).subscribe(() => window.location.reload());
  }

  public sendRemovedActionError() {
    this.send("Deze actie werkt niet in demo modus!",'SLUITEN', 1000*5).subscribe();
  }

}
