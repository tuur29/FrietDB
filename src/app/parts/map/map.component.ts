import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';
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

  // variables

  @Input() shops: any[] = [];
  @Input() markers: boolean = true;
  @Input() heatmap: boolean = false;
  
  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number = 8;

  private waitForBoundsCalc: boolean = false;

  constructor(
    private globals: GlobalsService,
    private mapsAPILoader: MapsAPILoader,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
  ) { }

  onMapLoad(map) {

    // parse coords to Google Coords
    let data = this.shops.map(function(s) {
      return new google.maps.LatLng(s.lat, s.lng);
    });

    // zoom and center map to see all markers
    if (this.shops.length > 1) {

      let bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < data.length; i++)
        bounds.extend(data[i]);

      map.fitBounds(bounds);

    }

    // add heatmap
    if (this.heatmap) {

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

      if ( (this.markers || this.heatmap) && this.shops.length > 1) {
        // algorith happens in onMapLoad
        this.waitForBoundsCalc = true;

      } else {
        // get default map center when location permission denied & not on shop page & no markers visible
        this.lat = this.globals.defaultLat;
        this.lng = this.globals.defaultLng;

      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {

    // Ask for location permission
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

    // Open info window if only one marker displayed
    this.shops.forEach(function(s) { s.infoWindowOpened = false });

    if (this.shops.length == 1) {
      this.shops[0].infoWindowOpened = true;
      this.lat = this.lat + 0.003;
    }

  }

  // Open infowindow on marker click

  infoWindowOpened = null;

  clickedMarker(id: number, infoWindow) {

    if( this.infoWindowOpened === infoWindow)
      return;
      
    if(this.infoWindowOpened !== null)
      this.infoWindowOpened.close();
      
    this.infoWindowOpened = infoWindow;
  }

}