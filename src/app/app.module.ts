import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule } from '@angular/material';

import { GlobalsService } from 'globals.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ErrorModule } from './error/error.module';
import { HomeModule } from './home/home.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

    MatToolbarModule,
    MatIconModule,

    ErrorModule,
    HomeModule,
    ShopModule,
    OrderModule,

  ],
  providers: [GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private globals: GlobalsService) {
    globals.title = window.document.title;

  }
}
