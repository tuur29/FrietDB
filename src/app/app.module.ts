import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { LAZY_MAPS_API_CONFIG } from '@agm/core/services';

import { GlobalsService } from 'globals.service';
import { KeysService } from 'keys.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SearchShopModule } from './searchshop/searchshop.module';
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
    AgmCoreModule.forRoot(),

    MatToolbarModule,
    MatIconModule,

    SearchShopModule,
    ErrorModule,
    HomeModule,
    ShopModule,
    OrderModule,
  ],
  providers: [
    GlobalsService,
    {provide: LAZY_MAPS_API_CONFIG, useClass: KeysService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private globals: GlobalsService) {
    globals.title = window.document.title;
  }
}
