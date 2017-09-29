// TODO: Request browser location and center map there

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `

    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">

      <agm-marker
        *ngFor="let shop of shops"
        (markerClick)="clickedMarker(shop.id, infoWindow)"
        [latitude]="shop.lat"
        [longitude]="shop.lng">

        <agm-info-window #infoWindow>
          <a [routerLink]="'/shop/'+shop.id">
            <strong>{{shop.name}}</strong><br>
            {{shop.street}} {{shop.number}},<br>
            {{shop.municipality}}
          </a>
        </agm-info-window>

      </agm-marker>

    </agm-map>

  `,
  styles: [`

    agm-map {
      height: 300px;
    }

  `]
})
export class MapComponent implements OnInit {

  @Input()
  shops: any[] = [];

  @Input()
  lat: number = 51.723858;

  @Input()
  lng: number = 7.895982;

  @Input()
  zoom: number = 8;

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
