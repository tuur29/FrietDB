import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightMaterialModule } from './lightmaterial.module';

import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { MatExpansionModule, MatTableModule, MatPaginatorModule, MatRippleModule,  MatSelectModule, MatSortModule
} from '@angular/material';

@NgModule({
  imports: [ MatExpansionModule, MatTableModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule
  ],
  exports: [
    LightMaterialModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule
  ],
})
export class MaterialModule { }
