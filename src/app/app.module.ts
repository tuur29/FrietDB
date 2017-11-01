import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { WebStorageModule } from 'ngx-store';

import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { MarkdownModule } from 'angular2-markdown';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderModule } from './parts/header/header.module';

import { GlobalsService } from 'app/services/globals.service';
import { ShopDataService } from './services/shopdata.service';
import { SnackDataService } from './services/snackdata.service';
import { EditDataService } from './services/editdata.service';

import { DialogsModule } from './dialogs/dialogs.module';
import { MessagesModule } from './messages/messages.module';

import { EditShopModule } from './pages/editshop/editshop.module';
import { EditsListModule } from './pages/editslist/editslist.module';
import { HeatmapModule } from './pages/heatmap/heatmap.module';
import { ErrorModule } from './pages/error/error.module';
import { HomeModule } from './pages/home/home.module';
import { ShopModule } from './pages/shop/shop.module';
import { OrderModule } from './pages/order/order.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,

    BrowserAnimationsModule,
    MaterialModule,

    RouterModule.forRoot(routes),
    WebStorageModule,

    AgmCoreModule.forRoot({
      apiKey: environment.mapskey,
      libraries: ['visualization']
    }),
    MarkdownModule.forRoot(),

    DialogsModule,
    MessagesModule,

    HeaderModule,

    EditsListModule,
    EditShopModule,
    HeatmapModule,
    ErrorModule,
    HomeModule,
    ShopModule,
    OrderModule,
  ],
  providers: [
    GlobalsService,
    ShopDataService,
    SnackDataService,
    EditDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private globals: GlobalsService) {
    globals.title = window.document.title;
  }
}
