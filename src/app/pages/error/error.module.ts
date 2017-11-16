import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';

import { LightMaterialModule } from '../../lightmaterial.module';

import { LoginModule } from '../../parts/login/login.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    LightMaterialModule,
    LoginModule,
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
