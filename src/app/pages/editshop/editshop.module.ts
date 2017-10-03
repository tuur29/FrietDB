import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditShopComponent } from './editshop.component';

import { MatButtonModule,MatIconModule,MatTooltipModule,MatInputModule,MatExpansionModule  } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatExpansionModule
  ],
  declarations: [EditShopComponent]
})
export class EditShopModule { }
