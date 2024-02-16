import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookComponent } from './dashboard/book/book.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { BookdescriptionComponent } from './dashboard/bookdescription/bookdescription.component';
import { AddbookComponent } from './dashboard/addbook/addbook.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, HeaderComponent, NavbarComponent, NgIf, HttpClientModule, FormsModule,ReactiveFormsModule,BookComponent, BookdescriptionComponent, AddbookComponent],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Library_App';
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
