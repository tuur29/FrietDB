// TODO Incorporate edit type (shop, snack) into routes? Or use popup for snack?

import { Routes } from '@angular/router';

import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { OrderComponent } from './pages/order/order.component';
import { HeatmapComponent } from './pages/heatmap/heatmap.component';
import { EditShopComponent } from './pages/editshop/editshop.component';
import { EditsListComponent } from './pages/editslist/editslist.component';

export const routes: Routes = [

  {
   path: 'shop/:id',
   component : ShopComponent
  },
  {
   path: 'order',
   component : OrderComponent
  },
  {
   path: 'heatmap',
   component : HeatmapComponent
  },
  {
   path: 'edit/shop',
   component : EditShopComponent,
  },
  {
   path: 'edit/shop/:id',
   component : EditShopComponent,
  },
  // {
  //  path: 'edit/snack',
  //  component : EditSnackComponent,
  // },
  // {
  //  path: 'edit/snack/:id',
  //  component : EditSnackComponent,
  // },
  {
   path: 'edits',
   component : EditsListComponent
  },
  {
    path: '',
    component : HomeComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }

];