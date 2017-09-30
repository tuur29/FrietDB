// TODO: Share functionality (send email?, copy markdown to clipboard?, native smartphone share)
// TODO: Prevent reload with alert when snacks added

import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../dialogs/dialogs.service';
import { GreaterThanPipe } from './filter-snacks.pipe';

import {Router,NavigationStart} from '@angular/router'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {MdOptionSelectionChange} from '@angular/material';

@Component({
  selector: 'app-order',
  template: `

    <md-card class="small">
      <h1>Maak je bestelling</h1>
      <p>Met deze tool kan je makkelijk de dichtste frituur vinden waar ze al jouw favoriete snacks hebben. Als extraatje kan je ook een handig briefje afdrukken om mee te nemen naar de frituur!</p>
    </md-card>

     <md-card class="small search">
      <form class="snacks-form">
        <md-form-field color="accent" class="full-width">

          <button md-icon-button mdPrefix>
            <md-icon>search</md-icon>
          </button>

          <input mdInput placeholder="Snack" aria-label="Snack" [mdAutocomplete]="auto" [formControl]="snackCtrl">

          <button *ngIf="snackCtrl.value" mdSuffix md-icon-button aria-label="Reset" (click)="snackCtrl.reset()">
          <md-icon>close</md-icon>
        </button>
          
          <md-autocomplete #auto="mdAutocomplete">
            <md-option (onSelectionChange)="pickSnack($event,snack.id)" *ngFor="let snack of filteredSnacks | async | orderBy: ['name']" [value]="snack.name">
                <span>{{snack.name}}</span>
              <small>{{snack.type}}</small>
            </md-option>
          </md-autocomplete>

        </md-form-field>
      </form>
    </md-card>

    <div *ngIf="snacksAdded">

      <md-card class="list small">
        <h2>Bestelling</h2>
        <md-list>

          <div *ngFor="let group of (snacks | itemsGreaterThan: 'count': 0 | groupBy:'type' | pairs) ; let last = last">
            <h3 md-subheader>{{group[0]}}</h3>
            <md-list-item *ngFor="let snack of group[1]">

              <md-icon mdListIcon>check_box</md-icon>
              <span *ngIf="snack.count > 0">
                {{snack.count}}x 
                <span (click)="openDialog(snack)" class="link">
                  {{snack.name}}
                  <md-icon *ngIf="snack.image || snack.link">open_in_new</md-icon>
                </span>
              </span>

              <span class="spacer"></span>

              <button md-icon-button aria-label="1 toevoegen" (click)="editSnackCount(snack.id,snack.count+1)">
                <md-icon>add</md-icon>
              </button>
              <button md-icon-button aria-label="1 aftrekken" (click)="editSnackCount(snack.id,snack.count-1)">
                <md-icon>remove</md-icon>
              </button>
              <button md-icon-button aria-label="Verwijderen" color="warn" (click)="editSnackCount(snack.id,0)">
                <md-icon>delete</md-icon>
              </button>

            </md-list-item>
            <div *ngIf="!last">
              <md-divider></md-divider>
            </div>
          </div>

        </md-list>
        <md-card-actions>
          <button md-button (click)="print()">PRINT</button>
          <button md-button>SHARE</button>
          <button md-button class="right" color="warn" (click)="resetOrder()">RESET</button>
        </md-card-actions>
      </md-card>

      <md-card class="full">
        <app-map [shops]="filteredShops"></app-map>
      </md-card>

    </div>
  
  `,
  styles: [`

    @media print {
      md-card:not(.list), md-card.list md-card-actions, md-card.list button, .link md-icon {
        display: none;
      }
    }

    md-list-item span {
      margin: 5px;
    }

    .right {
      float: right;
    }

    .link  {
      cursor: pointer;
    }

    .link md-icon {
      font-size: 1.25em;
      vertical-align: sub;
    }

  `]
})
export class OrderComponent implements OnInit {

  snacksAdded = false;
  selectedValue: string;
  router: Router;

  snackCtrl: FormControl;
  filteredSnacks: Observable<any[]>;
  snacks: any[] = [
    {
      id: 1,
      name: 'Hamburger',
      type: 'Snack',
      image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
    },
    {
      id: 2,
      name: 'Klein pakje',
      type: 'Frieten',
    },
    {
      id: 3,
      name: 'Sate',
      type: 'Snack',
      link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
    },
    {
      id: 4,
      name: 'Lucifer',
      type: 'Snack',
      image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
      link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
    },
    {
      id: 5,
      name: 'Joppie',
      type: 'Saus',
      image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
      link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
    },
    {
      id: 6,
      name: 'Ketchup',
      type: 'Saus',
    }
  ];

  filteredShops: any[] = [
    {
      id: 2,
      name: 'Frietshop',
      street: 'Straat2',
      number: '334',
      municipality: "Gemeente",
      lat: 51.373858,
      lng: 7.215982,
    },
    {
      id: 3,
      name: 'Frituur Nadine',
      street: 'Straat3',
      number: '2',
      municipality: "Gemeente",
      lat: 51.723858,
      lng: 7.895982,
    },
  ];

  constructor(
    private r: Router,
    private greaterThanPipe: GreaterThanPipe,
    private dialogsService: DialogsService) {

    this.snacks.forEach(function(s) { s.count = 0 });

    this.snackCtrl = new FormControl();
    this.filteredSnacks = this.snackCtrl.valueChanges
      .startWith(null)
      .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());
   
    this.router = r;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart)
        if (event.url != "/order" && this.router.url == "/order")
          if (this.snacksAdded)
            if (!confirm("Je bestelling wordt niet opgeslagen, ben je zeker dat je naar een andere pagina wilt gaan?"))
              this.router.navigate(['/order']);
    });

  }

  filterSnacks(query: string) {
    return this.snacks.filter(snack =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  pickSnack(event, id: number) {

    if (event.source.selected) {
      this.snacksAdded = true;
      this.snacks.find(s=>s.id===id).count++;

      let ctrl = this.snackCtrl;
      setTimeout(function() {
        ctrl.reset({value:"",disabled:true});
        ctrl.enable();
      },1);
    }

    // request and reload filtered shops

  }

  openDialog(snack) {
    if (snack.image || snack.link)
      this.dialogsService.snackinfo(snack.id);
  }

  resetOrder() {
    this.snacks.forEach(function(s) { s.count = 0 });
    this.snacksAdded = false;
    this.snackCtrl.reset();
  }

  editSnackCount(id:number, count: number) {
    if (count < 0) count = 0;
    this.snacks.find(s=>s.id===id).count = count;

    if (this.greaterThanPipe.transform(this.snacks,"count",0).length < 1 )
      this.snacksAdded = false;
  }

  print() {
    window.print();
  }

  ngOnInit() {
  }

}
