import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'globals.service';

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

  shops: any[];

  constructor(private globals: GlobalsService) {
    this.shops = globals.shops;
  }

  ngOnInit() {
  }

}
