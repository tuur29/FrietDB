// TODO: Markdown parser for shop description
// TODO: Page/Popup with snack info
// TODO: Flexbox set width limits

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  template: `

    <md-card>

      <img md-card-image [src]="shop.image" alt="Foto frituur" />
      <md-card-content class="floaty-grid split-2">

          <div>
            <h1>{{shop.name}}</h1>
            <p>{{shop.description}}</p>
          </div>

          <md-list dense>

            <md-list-item>
              <md-icon>map</md-icon>
              {{shop.street}} {{shop.number}}, {{shop.municipality}}
            </md-list-item>
            <md-list-item>
              <md-icon>phone</md-icon>
              {{shop.telephone}}
            </md-list-item>
            <md-list-item>
              <md-icon>email</md-icon>
              <a href="mailto:{{shop.email}}">{{shop.email}}</a>
            </md-list-item>
            <md-list-item>
              <md-icon>link</md-icon>
              <a href="http://{{shop.website}}">{{shop.website}}</a>
            </md-list-item>

          </md-list>

      </md-card-content>
    </md-card>

    <md-card class="full">
      <app-map [shops]="[shop]" [lat]="shop.lat" [lng]="shop.lng" [zoom]="13"></app-map>
    </md-card>

    <md-card>
      <h2>Aanbod</h2>
      <div class="floaty-grid">

        <div *ngFor="let group of (snacks | groupBy:'type' | pairs) ; let last = last">
          <h3 md-subheader>{{group[0]}}</h3>
          <md-list dense>
            <md-list-item *ngFor="let snack of group[1]">
              <span>{{snack.name}}</span>
            </md-list-item>
          </md-list>
        </div>

      </div>
    </md-card>
  `,
  styles: [`

    .floaty-grid {
      display: flex;
    }

    .floaty-grid > * {
      flex: 0 1 auto;
      padding: 10px 20px;
    }

    h2, h3 {
      margin: 0;
    }

    md-icon {
      margin-right: 10px;
    }

  `]
})
export class ShopComponent implements OnInit, OnDestroy {

  private subroute: any;
  private reqId: any;

  shop = {
    id: 1,
    name: 'Frietuur Patat',
    image: 'http://www.frituurlatem.be/fotos/header.jpg',
    description: 'Frituur Patat serveert een groot assortiment gefrituurde snacks. Wij zijn de enige in Oostakker die bovendien échte Bicky burgers maakt. Bekijk onze frieten en snacks.',
    street: 'Straat',
    number: '1',
    municipality: "Gemeente",
    telephone: '04 00 00 00 00',
    email: 'friet@shop.be',
    website: 'www.frituurpatat.be',
    lat: 51.4,
    lng: 7.9,
  };

  snacks: any[] = [
    {
      id: 1,
      name: 'Hamburger',
      type: 'Snack',
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
    },
    {
      id: 4,
      name: 'Lucifer',
      type: 'Snack',
    },
    {
      id: 5,
      name: 'Joppie',
      type: 'Saus',
    },
    {
      id: 6,
      name: 'Ketchup',
      type: 'Saus',
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
       this.reqId = +params['id']; // (+) converts string 'id' to a number
    })
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }


}
