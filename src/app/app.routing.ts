import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { OrderComponent } from './order/order.component';
import { HeatmapComponent } from './heatmap/heatmap.component';

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
    path: '',
    component : HomeComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }

];