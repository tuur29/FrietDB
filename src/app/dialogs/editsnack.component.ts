import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-editsnack',
  template: `

    <h1 md-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>
    
    <p>FORM HERE</p>

    <div md-dialog-actions>
      <span class="spacer"></span>
      <button md-button md-dialog-close color="warn">SLUITEN</button>
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
    public dialogRef: MdDialogRef<EditSnackDialog>
  ) {
    this.snack = globals.snacks[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}