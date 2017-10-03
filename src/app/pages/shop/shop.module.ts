import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './shop.component';
import { MapModule } from '../../parts/map/map.module';

import { MarkdownModule } from 'angular2-markdown';
import { NgPipesModule } from 'ngx-pipes';
import { MatIconModule,MatButtonModule,MatCardModule,MatListModule,MatGridListModule,MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    NgPipesModule,
    MarkdownModule,

    MapModule,

    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
  ],
  exports: [MarkdownModule],
  declarations: [ShopComponent],
})
export class ShopModule { }
