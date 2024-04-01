import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./componentes/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  constructor(
    private router : Router
  ) {
  }
  isLoginOrRegister(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/registro') || url.includes('/error');
  }
}
