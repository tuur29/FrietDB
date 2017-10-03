import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MapModule } from '../../parts/map/map.module';
import { LoginModule } from '../../parts/login/login.module';
import { SearchShopModule } from '../../parts/searchshop/searchshop.module';

import { HomeComponent } from './home.component';

import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    
    MatCardModule,

    LoginModule,
    MapModule,
    SearchShopModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
