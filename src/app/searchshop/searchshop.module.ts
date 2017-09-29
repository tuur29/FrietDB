import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchShopComponent } from './searchshop.component';

import { MatIconModule,MatButtonModule,MatCardModule,MatAutocompleteModule,MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports: [SearchShopComponent],
  declarations: [SearchShopComponent]
})
export class SearchShopModule { }
