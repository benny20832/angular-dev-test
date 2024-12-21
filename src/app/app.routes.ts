import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { AuthGuard } from './util/authGuard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
  },
  {
    path: 'orderList',
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
];
