import { Routes, Route, PreloadingStrategy } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';

import { Observable } from 'rxjs/Observable';

export const routes: Routes = [

  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopModule', data: {preload: true} },
  { path: 'order', loadChildren: './pages/order/order.module#OrderModule', data: {preload: true} },
  { path: 'heatmap', loadChildren: './pages/heatmap/heatmap.module#HeatmapModule', data: {preload: true} },
  { path: 'snacks', loadChildren: './pages/snacks/snacks.module#SnacksModule', data: {preload: true} },

  { path: 'edit', loadChildren: './pages/editshop/editshop.module#EditShopModule', data: {preload: false} },
  { path: 'edits', loadChildren: './pages/editslist/editslist.module#EditsListModule', data: {preload: false} },

  { path: 'users', loadChildren: './pages/users/users.module#UsersModule', data: {preload: false} },

  { path: 'error/:status/:redirect', component: ErrorComponent },
  { path: '', loadChildren: './pages/home/home.module#HomeModule', data: {preload: true} },
  { path: '**', component: ErrorComponent }

];

export class PreloadSelectedModulesList implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : typeof(null);
  }
}