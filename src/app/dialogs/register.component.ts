import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  template: `

    <h1 md-dialog-title>Registreer</h1>
    <form class="register-form">

      <md-form-field color="accent">
        <input type="text" required mdInput placeholder="Naam">
      </md-form-field>

      <md-form-field color="accent">
        <input type="email" required mdInput placeholder="E-mailadres">
      </md-form-field>
    
      <div md-dialog-actions>
        <button type="submit" md-raised-button color="accent">
          <md-icon>send</md-icon> Verstuur
        </button>

        <span class="spacer"></span>

        <button md-button md-dialog-close color="warn">SLUITEN</button>
      </div>

    </form>

  `,
  styles: [`

    .spacer {
      width: 10px;
    }

    form button md-icon {
      font-size: 22px;
      margin-right: 5px;
    }

    md-form-field {
      display: block;
    }

  `]
})
export class RegisterDialog implements OnInit {

  constructor(public dialogRef: MdDialogRef<RegisterDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}