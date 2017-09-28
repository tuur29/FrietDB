import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `

    <md-card class="full">
      <agm-map [latitude]="51.723858" [longitude]="7.895982" [zoom]="8">


        <agm-marker
          *ngFor="let shop of shops"
          (markerClick)="clickedMarker(shop.id, infoWindow)"
          [latitude]="shop.lat"
          [longitude]="shop.lng">

          <agm-info-window #infoWindow>
            <a [routerLink]="'/shop/'+shop.id">
              <strong>{{shop.name}}</strong><br>
              {{shop.location}}
            </a>
          </agm-info-window>

        </agm-marker>


      </agm-map>
    </md-card>

  `,
  styles: [`

    agm-map {
      height: 300px;
    }

  `]
})
export class MapComponent implements OnInit {

  shops: any[] = [
    {
      id: 1,
      name: 'Frietshop',
      location: 'Straat, Gemeente',
      lat: 51.673858,
      lng: 7.815982,
    },
    {
      id: 2,
      name: 'Frietshop',
      location: 'Straat1, Gemeente',
      lat: 51.373858,
      lng: 7.215982,
    },
    {
      id: 3,
      name: 'Frituur Nadine',
      location: 'Straat2, Gemeente',
      lat: 51.723858,
      lng: 7.895982,
    },
    {
      id: 4,
      name: 'Langs de waterkant',
      location: 'Straat, Gemeente',
      lat: 51.925,
      lng: 8,
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  infoWindowOpened = null;

  clickedMarker(id: number, infoWindow) {

    if( this.infoWindowOpened === infoWindow)
      return;
      
    if(this.infoWindowOpened !== null)
      this.infoWindowOpened.close();
      
    this.infoWindowOpened = infoWindow;
  }

}
