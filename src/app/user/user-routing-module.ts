import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayout } from './layout/user-layout/user-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Explore } from './pages/explore/explore';
import { Myorder } from './pages/myorder/myorder';
import { Cart } from './pages/cart/cart';
import { Wishlist } from './pages/wishlist/wishlist';
import { Checkout } from './pages/checkout/checkout';
import {  ProfileComponent } from './pages/profile/profile';

const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home },
      { path: 'cart', component: Cart },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'explore', component: Explore },
      { path: 'myorders', component: Myorder },
      { path: 'checkout', component: Checkout},
      {path: 'profile', component: ProfileComponent},

      {
        path: 'wishlist',
        component: Wishlist,
        runGuardsAndResolvers: 'always',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
