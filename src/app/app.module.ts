import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { routes, PreloadSelectedModulesList } from './app.routing';
import { RouterModule } from '@angular/router';
import { WebStorageModule } from 'ngx-store';

import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ErrorModule } from './pages/error/error.module';
import { HeaderModule } from './parts/header/header.module';

import { GlobalsService } from 'app/services/globals.service';
import { ShopDataService } from './services/shopdata.service';
import { SnackDataService } from './services/snackdata.service';
import { EditDataService } from './services/editdata.service';

import { DialogsModule } from './dialogs/dialogs.module';
import { MessagesModule } from './messages/messages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,

    RouterModule.forRoot(routes, {preloadingStrategy: PreloadSelectedModulesList}),
    WebStorageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapskey,
      libraries: ['visualization']
    }),

    BrowserAnimationsModule,
    MaterialModule,

    DialogsModule,
    MessagesModule,

    ErrorModule,
    HeaderModule
  ],
  providers: [
    PreloadSelectedModulesList,
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
