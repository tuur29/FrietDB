import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `

    <h1 mat-dialog-title>Registreer</h1>
    <form [formGroup]="form" (ngSubmit)='onSubmit(form.value)'>

      <mat-form-field>
        <input type="text" matInput placeholder="Naam" required formControlName="name">
        <mat-error *ngIf="form.hasError('required', 'name') && form.get('name').touched">
          Gelieve een naam in te vullen.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input type="email" matInput placeholder="E-mailadres" required formControlName="email">
        <mat-error *ngIf="form.hasError('email', 'email') && form.get('email').touched">
          Gelieve een geldig e-mailadres in te vullen.
        </mat-error>
      </mat-form-field>

      <div mat-dialog-actions>
        <button type="submit" [disabled]='!form.valid' mat-raised-button color="primary">
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

    mat-form-field:not(:first-of-type) {
      display: block;
      margin: 20px 0;
    }

  `]
})
export class RegisterDialog implements OnInit {

  private form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialog>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data: any) {
      console.log('sending', data.name, data.email);
      this.dialogRef.close();
  }

  ngOnInit() {
  }

}
