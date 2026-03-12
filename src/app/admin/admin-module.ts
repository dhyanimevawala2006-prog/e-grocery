import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing-module';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { provideHttpClient } from '@angular/common/http';
import { routes } from '../app.routes';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
