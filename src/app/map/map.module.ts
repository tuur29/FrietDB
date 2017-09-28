import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
  	CommonModule,
  	AgmCoreModule,
  	MatCardModule,
  ],
  exports: [AgmCoreModule],
  declarations: []
})
export class MapModule { }
