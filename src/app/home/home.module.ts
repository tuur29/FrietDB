import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MapModule } from '../map/map.module';

import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';

import { MatIconModule,MatButtonModule,MatCardModule,MatAutocompleteModule,MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    
    MapModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
  ]
})
export class HomeModule { }
