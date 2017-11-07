import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeatmapComponent } from './heatmap.component';

import { MaterialModule } from '../../material.module';

import { MapModule } from '../../parts/map/map.module';

@NgModule({
  imports: [
  	RouterModule.forChild([
      { path: '', component: HeatmapComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    MaterialModule,
    MapModule,
  ],
  declarations: [HeatmapComponent]
})
export class HeatmapModule { }
