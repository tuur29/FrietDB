import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';

import { MatCardModule } from '@angular/material';
import { LoginModule } from '../login/login.module';

@NgModule({
  imports: [
  	RouterModule,
    CommonModule,
    MatCardModule,
    LoginModule,
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
