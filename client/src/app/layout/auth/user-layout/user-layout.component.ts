import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  constructor(private router: Router){}
  ismainpage(): boolean {
    return this.router.url === '/main';
}
  isuserpage(): boolean{
    return this.router.url === '/userhome';
  }
}
