import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';

import { MapModule } from '../../parts/map/map.module';

import { NgPipesModule } from 'ngx-pipes';

import { MatIconModule,MatButtonModule,MatCardModule,MatAutocompleteModule,MatInputModule,MatListModule,MatGridListModule,MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    NgPipesModule,

    MapModule,
    
    MatTooltipModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  declarations: [
    OrderComponent,
  ],
  providers: []
})
export class OrderModule { }
