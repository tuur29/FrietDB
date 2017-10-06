// TODO: Send accept/deny events to seperate component?

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-editsnack',
  template: `

    <h1 mat-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>
    
    <form class="edit-form">

      <mat-form-field color="accent">
        <input type="text" [(ngModel)]="snack.name" name="name" required matInput placeholder="Naam">
      </mat-form-field>

      <mat-select color="accent" required placeholder="Type" [(ngModel)]="snack.type" name="type">
        <mat-option *ngFor="let type of globals.snacktypes" [value]="snack.type">
          {{type}}
        </mat-option>
      </mat-select>

      <mat-form-field color="accent" class="full">
        <input type="text" [(ngModel)]="snack.image" name="image" matInput placeholder="Foto URL">
      </mat-form-field>

      <mat-form-field color="accent" class="full">
        <input type="text" [(ngModel)]="snack.link" name="link" matInput placeholder="Meer Info URL">
      </mat-form-field>

    </form>

    <div mat-dialog-actions>
      <button type="submit" mat-raised-button color="accent">
        <mat-icon>save</mat-icon> Opslaan
      </button>
      <span class="spacer"></span>
      <button mat-button mat-dialog-close color="warn">SLUITEN</button>
    </div>

  `,
  styles: [`

    .full {
      display: block;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    form, .full {
      min-width: 400px;
    }

    mat-select {
      margin-bottom: 15px;
    }

  `]
})
export class EditSnackDialog implements OnInit {

  reqId: number;
  snack: any;

  constructor(
    public globals: GlobalsService,
    public dialogRef: MatDialogRef<EditSnackDialog>
  ) {
    this.snack = globals.snacks[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}