// TODO: Smart define zoom level based on most results visible

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MapsAPILoader,GoogleMapsAPIWrapper } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map',
  template: `

    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom" (mapReady)="onMapLoad($event)">

      <ng-container *ngIf="markers">
        <agm-marker
          *ngFor="let shop of shops"
          (markerClick)="clickedMarker(shop.id, infoWindow)"
          [latitude]="shop.lat"
          [longitude]="shop.lng">

          <agm-info-window #infoWindow [isOpen]="shop.infoWindowOpened">
            <a [routerLink]="'/shop/'+shop.id">
              <strong>{{shop.name}}</strong><br>
              {{shop.street}} {{shop.number}},<br>
              {{shop.municipality}}
            </a>
          </agm-info-window>

        </agm-marker>
      </ng-container>

    </agm-map>

  `,
  styles: [`

    agm-map {
      height: 300px;
    }

  `]
})
export class MapComponent implements OnInit,OnChanges {

  @Input() shops: any[] = [];
  @Input() markers: boolean = true;
  @Input() heatmap: boolean = false;
  
  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number = 8;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper
  ) { }

  onMapLoad(map) {

    if (this.heatmap) {

      let data = this.shops.map(function(s) {
        return new google.maps.LatLng(s.lat, s.lng);
      });

      let heatmap = new google.maps.visualization.HeatmapLayer({
        data: data,
        radius: 35,
        opacity: 0.7,
        map: map
      });
    }

  }

  setDefaultPosition() {
    if (this.lat === undefined || this.lng === undefined) {
      this.lat = 51.723858;
      this.lng = 7.895982;
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {

    this.shops.forEach(function(s) { s.infoWindowOpened = false });

    if (navigator.geolocation && (this.lat === undefined || this.lng === undefined)) {
      
      var that = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        that.lat = position.coords.latitude;
        that.lng = position.coords.longitude;

      }, function() {
        that.setDefaultPosition();
      });
      
    } else {
      this.setDefaultPosition();
    }

    if (this.shops.length == 1) {
      this.shops[0].infoWindowOpened = true;
      this.lat = this.lat + 0.003;
    }

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
