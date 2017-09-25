import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';


import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    MatButtonModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
