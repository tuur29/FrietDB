// TODO: Show error when email field incorrectly formatted

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  template: `

    <h1 mat-dialog-title>Registreer</h1>
    <form #form>

      <mat-form-field>
        <input type="text" [(ngModel)]="name" name="name" required matInput placeholder="Naam">
      </mat-form-field>

      <mat-form-field>
        <input type="email" [(ngModel)]="email" name="email" required matInput placeholder="E-mailadres">
      </mat-form-field>
    
      <div mat-dialog-actions>
        <button type="submit" (click)="send()" mat-raised-button color="primary">
          <mat-icon>send</mat-icon> Verstuur
        </button>

        <span class="spacer"></span>

        <button mat-button mat-dialog-close color="warn">SLUITEN</button>
      </div>

    </form>

  `,
  styles: [`

    .spacer {
      width: 10px;
    }

    form button mat-icon {
      font-size: 22px;
      margin-right: 5px;
    }

    mat-form-field {
      display: block;
    }

  `]
})
export class RegisterDialog implements OnInit {

  name: string;
  email: string;

  @ViewChild('form') form;

  constructor(public dialogRef: MatDialogRef<RegisterDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  send() {
    if (this.form.nativeElement.checkValidity()) {
      console.log("sending",this.name,this.email);
      this.dialogRef.close();
    }
  }

  ngOnInit() {
  }

}