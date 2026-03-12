import { Component } from '@angular/core';
import { AdminRoutingModule } from "../../admin-routing-module";

@Component({
  selector: 'app-sidebar',
  imports: [AdminRoutingModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
