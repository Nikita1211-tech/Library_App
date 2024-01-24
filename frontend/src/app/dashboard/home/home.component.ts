import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent,MainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
    }
  }
}
