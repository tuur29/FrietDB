import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule,
  ],
  exports: [AgmCoreModule, MapComponent],
  providers: [GoogleMapsAPIWrapper],
  declarations: [MapComponent]
})
export class MapModule { }
