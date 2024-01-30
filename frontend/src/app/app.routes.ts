import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { MainComponent } from './dashboard/main/main.component';
import { BookComponent } from './dashboard/book/book.component';
import { ReaderComponent } from './dashboard/reader/reader.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

// app-routing.module.ts
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'reader', component: ReaderComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
];
