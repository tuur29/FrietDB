import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-snackinfo',
  template: `

    <img [src]="snack.image" *ngIf="snack.image">
    <h1 md-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>
    
    <div md-dialog-actions>
      
      <a md-icon-button *ngIf="snack.link" [href]="snack.link">
        <md-icon>open_in_new</md-icon>
        Meer Info
      </a>

      <span class="spacer"></span>
      <button md-button md-dialog-close color="warn">SLUITEN</button>
    </div>

  `,
  styles: [`

    img {
      max-width: 300px;
    }

  `]
})
export class SnackInfoDialog implements OnInit {

  public reqId: number;

  snack;

  constructor(
    private globals: GlobalsService,
    public dialogRef: MdDialogRef<SnackInfoDialog>
  ) {
    this.snack = globals.snacks[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}