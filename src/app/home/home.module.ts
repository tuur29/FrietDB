import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MapModule } from '../map/map.module';
import { SearchShopModule } from '../searchshop/searchshop.module';

import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';

import { MatCardModule,MatButtonModule,MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,

    MapModule,
    SearchShopModule,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
  ]
})
export class HomeModule { }
