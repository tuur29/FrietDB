import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatmapComponent } from './heatmap.component';

import { MapModule } from '../../parts/map/map.module';

import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatCardModule,

    MapModule,
  ],
  declarations: [HeatmapComponent]
})
export class HeatmapModule { }
