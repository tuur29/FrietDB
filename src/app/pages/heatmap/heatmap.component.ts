import { Component, OnInit } from '@angular/core';
import { ShopDataService } from 'app/services/shopdata.service';

@Component({
  selector: 'app-heatmap',
  template: `

    <mat-card>
      <h1>Heatmap</h1>
      <p>Hieronder kan je een beeld krijgen waar de meeste frituren al gecatalogiseerd zijn.</p>
    </mat-card>

    <mat-card class="full">
      <app-map [heatmap]="true" [markers]="false" [shops]="shops"></app-map>
    </mat-card>

  `,
  styles: []
})
export class HeatmapComponent implements OnInit {

  private shops: any[];

  constructor(private shopDataService: ShopDataService) {}

  ngOnInit() {
    this.shopDataService.getShops().subscribe(shops => {
      this.shops = shops;
    });
  }

}
