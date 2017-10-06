// TODO: Add edit snack UI
// TODO: Send accept/deny events to seperate component?

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-editsnack',
  template: `

    <h1 mat-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>
    
    <p>FORM HERE</p>

    <div mat-dialog-actions>
      <span class="spacer"></span>
      <button mat-button mat-dialog-close color="warn">SLUITEN</button>
    </div>

  `,
  styles: [`

  `]
})
export class EditSnackDialog implements OnInit {

  public reqId: number;

  snack;

  constructor(
    private globals: GlobalsService,
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