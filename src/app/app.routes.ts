import { Routes } from '@angular/router';
import { MasterComponent } from './shared/master/master.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderComponent } from './pages/order/order.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/Guards/auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

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
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user-edit/:UserId', component: UserCreateComponent },

      { path: 'product', component: ProductComponent },
      { path: 'order', component: OrderComponent },
    ],
  },
];
