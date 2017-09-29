import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';

import { MapModule } from '../map/map.module';

import { NgPipesModule } from 'ngx-pipes';
import { GreaterThanPipe, LessThanPipe } from './filter-snacks.pipe';

import { MatIconModule,MatButtonModule,MatCardModule,MatAutocompleteModule,MatInputModule,MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    NgPipesModule,

    MapModule,
    
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
    GreaterThanPipe,
    LessThanPipe,
  ],
  providers: [GreaterThanPipe]
})
export class OrderModule { }
