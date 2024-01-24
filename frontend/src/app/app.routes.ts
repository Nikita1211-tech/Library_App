import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { HomeComponent } from './dashboard/home/home.component';
import { MainComponent } from './dashboard/main/main.component';
import { BookComponent } from './dashboard/book/book.component';
import { ReaderComponent } from './dashboard/reader/reader.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'reader', component: ReaderComponent }
  ];
