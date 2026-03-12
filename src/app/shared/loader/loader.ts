import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  constructor(public loader: LoadingService) {}
}
