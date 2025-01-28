import { Routes } from '@angular/router';
import { MasterComponent } from './shared/master/master.component';

import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/Guards/auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MasterComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', component: UserListComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'order', component: OrderListComponent },
    ],
  },
];
