import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { Loader } from '../../../shared/loader/loader';
import { Toast } from '../../../shared/toast/toast';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [Header, Footer, RouterOutlet, Loader, Toast],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {}
