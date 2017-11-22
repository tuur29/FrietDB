import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { GlobalsService } from 'app/services/globals.service';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

declare let google: any;

@Component({
  selector: 'app-map',
  template: `

    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom" (mapReady)="onMapLoad($event)" *ngIf="shops" [style.height]="height">

      <ng-container *ngIf="markers">
        <agm-marker
          *ngFor="let shop of shops"
          (markerClick)="clickedMarker(shop.id, infoWindow)"
          [latitude]="shop.lat"
          [longitude]="shop.lng">

          <agm-info-window #infoWindow [isOpen]="shop.infoWindowOpened">
            <a [routerLink]="'/shop/'+shop.id" class="dark">
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
      min-height: 300px;
    }

  `]
})
export class MapComponent implements OnInit, OnChanges {

  // variables

  @Input() shops: any[] = [];
  @Input() markers: boolean = true;
  @Input() heatmap: boolean = false;

  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number = 8;
  @Input() height: string = '300px';
  maxZoom: number = 14;

  map;

  constructor(
    private globals: GlobalsService,
    private mapsAPILoader: MapsAPILoader,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
  ) { }

  onMapLoad(map) {
    this.map = map;

    if (this.heatmap) {
      // parse coords to Google Coords
      let data = this.shops.map((s) =>
        new google.maps.LatLng(s.lat, s.lng)
      );

      // add heatmap
      let heatmap = new google.maps.visualization.HeatmapLayer({
        data: data,
        radius: 60,
        opacity: 0.7,
        map: map
      });
    }

    this.ngOnChanges();

  }

  ngOnInit() {
    // Ask for location permission
    if (navigator.geolocation && (this.lat === undefined || this.lng === undefined)) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }, () => {
        this.lat = 50.5039;
        this.lng = 4.4699;
      });

    }
  }

  ngOnChanges() {
    if (!this.shops) return;

    // Open info window if only one marker displayed
    this.shops.forEach((s) => s.infoWindowOpened = false );

    if (this.shops.length === 1) {
      this.shops[0].infoWindowOpened = true;
      this.lat = this.lat + 0.003;
    }

    if (this.shops.length < 1 || !this.map) return;

    // parse coords to Google Coords
    let data = this.shops.map((s) =>
      new google.maps.LatLng(s.lat, s.lng)
    );

    setTimeout(()=>{

      // zoom and center map to see all markers
      let bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++)
        bounds.extend(data[i]);
      this.map.fitBounds(bounds);

      // set minimum zoom
      let listener = google.maps.event.addListener(this.map, "idle", () => { 
        if (this.map.getZoom() > this.maxZoom) this.map.setZoom(this.maxZoom); 
        google.maps.event.removeListener(listener); 
      });
      
    }, 1);
  }

  // Open infowindow on marker click

  infoWindowOpened = null;

  clickedMarker(id: string, infoWindow) {

    if (this.infoWindowOpened === infoWindow)
      return;

    if (this.infoWindowOpened !== null)
      this.infoWindowOpened.close();

    this.infoWindowOpened = infoWindow;
  }

}
