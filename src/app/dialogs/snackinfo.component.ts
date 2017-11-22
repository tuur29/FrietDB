import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SnackDataService } from 'app/services/snackdata.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-snackinfo',
  template: `

    <div *ngIf="snack" class="popup">

      <img [src]="snack.image" *ngIf="snack.image" alt="Foto kon niet geladen worden">
      <h1 mat-dialog-title>{{snack.name}} | <small>{{snack.type}}</small></h1>
      <p *ngIf="snack.vegi" class="color-green"><mat-icon>check_circle</mat-icon> Vegetarisch</p>

      <small>Enkel ter illustratie. Snacks in de frituur kunnen verschillen van wat je hier ziet.</small>

      <div mat-dialog-actions>

        <a mat-icon-button *ngIf="snack.link" [href]="snack.link">
          <mat-icon>open_in_new</mat-icon>
          Meer Info
        </a>

        <span class="spacer"></span>
        <button mat-button mat-dialog-close color="warn">SLUITEN</button>
      </div>

    </div>

  `,
  styles: [`

    img {
      width: 100%;
    }

    small { margin: 5px 0; }

    .popup {
      min-width: 175px;
      max-width: 300px;
      min-height: 300px;
      max-height: 600px;
    }

  `]
})
export class SnackInfoDialog implements OnInit {

  id: string;
  snack: any;

  constructor(
    private snackDataService: SnackDataService,
    public dialogRef: MatDialogRef<SnackInfoDialog>
  ) {}

  setId(id: string) {
    this.id = id;
    this.snackDataService.getSnack(this.id).subscribe(snack => {
      this.snack = snack;
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
