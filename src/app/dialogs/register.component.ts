import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  template: `

    <h1 mat-dialog-title>Registreer</h1>
    <form class="register-form">

      <mat-form-field color="accent">
        <input type="text" required matInput placeholder="Naam">
      </mat-form-field>

      <mat-form-field color="accent">
        <input type="email" required matInput placeholder="E-mailadres">
      </mat-form-field>
    
      <div mat-dialog-actions>
        <button type="submit" mat-raised-button color="accent">
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

  constructor(public dialogRef: MatDialogRef<RegisterDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}