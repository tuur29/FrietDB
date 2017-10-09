import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { MapModule } from '../../parts/map/map.module';
import { LoginModule } from '../../parts/login/login.module';
import { SearchShopModule } from '../../parts/searchshop/searchshop.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,

    LoginModule,
    MapModule,
    SearchShopModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
