import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../dialogs/dialogs.service';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-editslist',
  template: `
    
    <mat-card>
      <h1>Goed te keuren aanpassingen aan Frituren</h1>
      <app-table [data]="shopEdits"></app-table>
    </mat-card>

    <mat-card>
      <h1>Goed te keuren aanpassingen aan Snacks</h1>
      <app-table [data]="snackEdits"></app-table>
    </mat-card>

  `,
  styles: []
})
export class EditsListComponent implements OnInit {

  shopEdits: any[] = [];
  snackEdits: any[] = [];

  constructor(
    private globals: GlobalsService,
    private route: ActivatedRoute,
    public dialogsService: DialogsService,
    private router: Router,
  ) {

    if (router.url.indexOf("/edit/snack") > -1 && route.snapshot.params['id']) {
      this.dialogsService.editsnack(route.snapshot.params['id']).subscribe(() => {
        this.router.navigate(['edits']);
      });
    }

    this.shopEdits = globals.editslist.filter(edit =>
      edit.type == "shop"
    );

    this.snackEdits = globals.editslist.filter(edit =>
      edit.type == "snack"
    );

  }

  ngOnInit() {
    if (!this.globals.auth.token || !this.globals.auth.admin)
      this.router.navigate(['error', 403, "edits"]);
  }

}
