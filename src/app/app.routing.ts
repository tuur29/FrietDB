import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { EditShopComponent } from './editshop/editshop.component';
import { EditsListComponent } from './editslist/editslist.component';

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
   path: 'edit',
   component : EditShopComponent,
  },
  {
   path: 'edit/:id',
   component : EditShopComponent,
  },
  {
   path: 'listedits',
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