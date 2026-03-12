import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { ShowProduct } from './pages/show-product/show-product';
import { AddProduct } from './pages/add-product/add-product';
import { ShowUser } from './pages/show-user/show-user';
import { Allorder } from './pages/allorder/allorder';
import { EditProductComponent } from './pages/edit-product/edit-product';
import { AdminLogin } from './pages/admin-login/admin-login';
import { adminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/admin-login/admin-login').then((m) => m.AdminLogin),
  },
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout/admin-layout').then((m) => m.AdminLayout),
    canActivate: [adminAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'showproduct',
        loadComponent: () => import('./pages/show-product/show-product').then((m) => m.ShowProduct),
      },
      {
        path: 'addproduct',
        loadComponent: () => import('./pages/add-product/add-product').then((m) => m.AddProduct),
      },
      { path: 'allorder', component: Allorder },
      {
        path: 'show-user',
        loadComponent: () => import('./pages/show-user/show-user').then((m) => m.ShowUser),
      },
      { path: 'editproduct/:id', component: EditProductComponent },
      {
        path: 'coupon',
        loadComponent: () => import('./pages/coupon/coupon').then((m) => m.Coupon),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
