import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../dialogs/dialogs.service';
import { GlobalsService } from 'app/services/globals.service';
import { EditDataService } from 'app/services/editdata.service';

@Component({
  selector: 'app-editslist',
  template: `

    <mat-card *ngIf="shopEdits">
      <h1>Goed te keuren aanpassingen aan Frituren</h1>
      <app-table [data]="shopEdits" type="shop"></app-table>
    </mat-card>

    <mat-card *ngIf="snackEdits">
      <h1>Goed te keuren aanpassingen aan Snacks</h1>
      <app-table [data]="snackEdits" type="snack"></app-table>
    </mat-card>

  `,
  styles: []
})
export class EditsListComponent implements OnInit {

  private shopEdits: any[];
  private snackEdits: any[];

  constructor(
    private globals: GlobalsService,
    private editDataService: EditDataService,
    private route: ActivatedRoute,
    public dialogsService: DialogsService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.editDataService.getShopEdits().subscribe(edits => {
      this.shopEdits = edits;
    });

    this.editDataService.getSnackEdits().subscribe(edits => {
      this.snackEdits = edits;
    });

    if (!this.globals.auth.token || !this.globals.auth.admin)
      this.router.navigate(['error', 403, 'edits']);
  }

}
