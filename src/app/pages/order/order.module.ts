import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OrderComponent } from './order.component';
import { MapModule } from '../../parts/map/map.module';

import { LightMaterialModule } from '../../lightmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: ':id', component: OrderComponent, pathMatch: 'full' },
      { path: '', component: OrderComponent, pathMatch: 'full' },
    ]),
    CommonModule,
    LightMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    MapModule,
  ],
  declarations: [
    OrderComponent,
  ],
  providers: []
})
export class OrderModule { }
