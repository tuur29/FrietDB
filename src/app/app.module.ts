import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { WebStorageModule } from 'ngx-store';

import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule } from '@angular/material';

import { MarkdownModule } from 'angular2-markdown';
import { AgmCoreModule } from '@agm/core';

import { DialogsModule } from './dialogs/dialogs.module';
import { MessagesModule } from './messages/messages.module';
import { GlobalsService } from 'globals.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { LoginModule } from './login/login.module';
import { SearchShopModule } from './searchshop/searchshop.module';

import { EditShopModule } from './editshop/editshop.module';
import { EditsListModule } from './editslist/editslist.module';
import { HeatmapModule } from './heatmap/heatmap.module';
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
    WebStorageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapskey,
      libraries: ["visualization"]
    }),
    MarkdownModule.forRoot(),

    MatToolbarModule,
    MatIconModule,

    DialogsModule,
    MessagesModule,
    SearchShopModule,
    LoginModule,
    
    EditsListModule,
    EditShopModule,
    HeatmapModule,
    ErrorModule,
    HomeModule,
    ShopModule,
    OrderModule,
  ],
  providers: [
    GlobalsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private globals: GlobalsService) {
    globals.title = window.document.title;
  }
}
