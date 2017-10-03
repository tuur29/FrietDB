import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatmapComponent } from './heatmap.component';

import { MaterialModule } from '../../material.module';

import { MapModule } from '../../parts/map/map.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MapModule,
  ],
  declarations: [HeatmapComponent]
})
export class HeatmapModule { }
