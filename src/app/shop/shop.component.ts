import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogsService } from '../dialogs/dialogs.service';

@Component({
  selector: 'app-shop',
  template: `

    <md-card>

      <img md-card-image [src]="shop.image" alt="Foto frituur" />
      <md-card-content class="floaty-grid">

          <div>
            <h1>{{shop.name}}</h1>
            <markdown>{{shop.description}}</markdown>
          </div>

          <md-list dense class="small">

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

        <div *ngFor="let group of (snacks | groupBy:'type' | pairs)">

          <h2 md-subheader>{{group[0]}}</h2>

          <md-list>
            <md-list-item *ngFor="let snack of group[1]">
              <div (click)="openDialog(snack)" class="link">
                <span>{{snack.name}}</span>
                <md-icon *ngIf="snack.image || snack.link">open_in_new</md-icon>
              </div>
            </md-list-item>
          </md-list>

        </div>

      </div>
    </md-card>
    
  `,
  styles: [`

    .floaty-grid {
      display: flex;
      flex-wrap: wrap;
    }

    .floaty-grid > * {
      flex: 1 1 200px;
      align-items: flex-start;
      padding: 10px 20px;
    }

    .floaty-grid > .small {
      flex: 0 1 200px;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
    }

    h2, h3 {
      margin: 0;
    }

    md-icon {
      margin-right: 10px;
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
export class ShopComponent implements OnInit, OnDestroy {

  private subroute: any;
  private reqId: any;

  shop = {
    id: 1,
    name: 'Frituur Patat',
    image: 'http://www.frituurlatem.be/fotos/header.jpg',
    description: `
    Frituur Patat serveert een groot assortiment gefrituurde snacks. Wij zijn de enige in Oostakker die bovendien échte Bicky burgers maakt. Bekijk onze frieten en snacks.

    Wij hebben in huis:
    - Frieten
    - Snacks
    - Belegde broodjes
    - Wamre schotels
    `,
    street: 'Eeenheeelelaaangeestraaatnaaam',
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
      image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
      link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
    },
    {
      id: 4,
      name: 'Eenheellangesnacknaam',
      type: 'Snack',
      link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
    },
    {
      id: 5,
      name: 'Joppie',
      type: 'Saus',
      image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
    },
    {
      id: 6,
      name: 'Ketchup',
      type: 'Saus',
      image: 'https://www.mora.nl/media/image/007201_1030854-kipkorn-5st-r.png',
      link: 'https://www.mora.nl/1087/producten/snacks/kip/kipkorn-originals.html',
    }
  ];

  constructor(private route: ActivatedRoute, private dialogsService: DialogsService) { }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
       this.reqId = +params['id']; // (+) converts string 'id' to a number
    })
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  openDialog(snack) {
    if (snack.image || snack.link)
      this.dialogsService.snackinfo(snack.id);
  }

}