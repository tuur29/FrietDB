import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { SnackDataService } from 'app/services/snackdata.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-order',
  template: `

    <mat-card class="small">
      <h1>Alle Snacks</h1>
      <p>Deze pagina bevat een handig overzicht van alle gecategorizeerde snacks. Om te weten waar je ze kan krijgen, kan je de 'Bestelling' pagina gebruiken.</p>
    </mat-card>

    <!-- Search -->

    <mat-card class="small search">
      <form>
        <mat-form-field class="full-width">

          <button mat-icon-button matPrefix>
            <mat-icon>search</mat-icon>
          </button>

          <input matInput placeholder="Snacks zoeken" aria-label="Snacks zoeken" [formControl]="snackCtrl">

          <button *ngIf="snackCtrl.value" matSuffix mat-icon-button aria-label="Reset" (click)="snackCtrl.reset()">
          <mat-icon>close</mat-icon>
        </button>

        </mat-form-field>
      </form>
    </mat-card>

    <!-- List -->

    <mat-card class="list small">
      <mat-list>

        <ng-container *ngFor="let group of (filteredSnacks | async | groupBy:'type' | pairs) ; let last = last">
          <h3 mat-subheader>{{group[0]}}</h3>
          <mat-list-item *ngFor="let snack of group[1]">

            <span>
              <ng-container *ngIf="snack.image || snack.link;else onlyname">
                <span (click)="handleMoreInfo(snack)" class="link" aria-label="Meer info" matTooltip="Meer info">
                  {{snack.name}} <mat-icon class="color-green" matTooltip="Vegetarisch" *ngIf="snack.vegi">check_circle</mat-icon>
                  <mat-icon>open_in_new</mat-icon>
                </span>
              </ng-container>

              <ng-template #onlyname>
                {{snack.name}} <mat-icon class="color-green" matTooltip="Vegetarisch" *ngIf="snack.vegi">check_circle</mat-icon>
              </ng-template>

              <span *ngIf="globals.auth.token && !globals.auth.admin" (click)="dialogsService.editsnack(snack.id)" class="link" aria-label="Aanpassen" matTooltip="Aanpassen">
                <mat-icon>edit</mat-icon>
              </span>

            </span>

          </mat-list-item>
          <ng-container *ngIf="!last">
            <mat-divider></mat-divider>
          </ng-container>
        </ng-container>

      </mat-list>
    </mat-card>


  `,
  styles: [`

    mat-list-item span {
      cursor: pointer;
    }

    .right {
      float: right;
    }

    .link  {
      cursor: pointer;
    }

    .link mat-icon {
      font-size: 1.25em;
      vertical-align: sub;
    }

  `]
})
export class SnacksComponent implements OnInit {

  // variables
  snacks: any[];
  snackCtrl: FormControl = new FormControl();
  filteredSnacks: Observable<any[]>;

  constructor(
    public globals: GlobalsService,
    private snackDataService: SnackDataService,
    public dialogsService: DialogsService) {}

  ngOnInit() {
    this.snackDataService.getSnacks().subscribe(snacks => {
      this.snacks = snacks;
      this.filteredSnacks = this.snackCtrl.valueChanges
        .startWith(null)
        .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());
    });
  }

  // filter snacks on search
  filterSnacks(query: string) {
    return this.snacks.filter(snack =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || 
      snack.type.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  handleMoreInfo(snack: any) {
    if (snack.image != "")
      this.dialogsService.snackinfo(snack.id);
    else if (snack.link != "")
      window.open(snack.link);
  }

}
