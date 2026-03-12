import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { ShowCart } from './user/pages/show-cart/show-cart';
import { Myorder } from './user/pages/myorder/myorder';
import { EditProductComponent } from './admin/pages/edit-product/edit-product';
import { Otp } from './otp/otp';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/user-module').then((m) => m.UserModule),
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'showcart', component: ShowCart },
  { path: 'myorder', component: Myorder },
  { path: 'admin/edit-product/:id', component: EditProductComponent },
  {
    path: 'otp',
    component: Otp,
  },
];
