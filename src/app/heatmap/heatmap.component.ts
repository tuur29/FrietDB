import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  template: `

    <md-card>
      <h1>Heatmap</h1>
      <p>Hieronder kan je een beeld krijgen waar de meeste frituren al gecatalogiseerd zijn.</p>
    </md-card>

    <md-card class="full">
      <app-map [heatmap]="true" [markers]="false" [shops]="shops"></app-map>
    </md-card>

  `,
  styles: []
})
export class HeatmapComponent implements OnInit {

  shops: any[] = [
    {
      id: 1,
      name: 'Frietshop',
      street: 'Straat1',
      number: '41',
      municipality: "Gemeente",
      lat: 51.673858,
      lng: 7.815982,
    },
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
    {
      id: 4,
      name: 'Langs de waterkant',
      street: 'Straat4',
      number: '55',
      municipality: "Gemeente",
      lat: 51.925,
      lng: 8,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
