import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';


import { MapModule } from '../map/map.module';

import { NgPipesModule } from 'ngx-pipes';
import { MatIconModule,MatButtonModule,MatCardModule,MatListModule,MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    NgPipesModule,

    MapModule,

    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
  ],
  declarations: [ShopComponent]
})
export class ShopModule { }
