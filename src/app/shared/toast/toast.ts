import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { ToastService } from '../../service/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  constructor(public toast: ToastService) {}
}
