import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
  constructor(private router: Router){}
  isloginpage(): boolean {
    return this.router.url === '/login';
  }
  islandingpage():boolean {
    return this.router.url === '/main';
  }
  isregisterpage(): boolean {
    return this.router.url === '/register';
  }
}
