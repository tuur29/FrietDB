import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';

export const routes: Routes = [
  
  {
     path: '',
     component : HomeComponent
  },
  {
     path: 'page',
     component : PageComponent
  },

];