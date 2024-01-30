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

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'main', component: MainComponent },
      { path: 'reader', component: ReaderComponent },
      { path: 'book', component: BookComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }
];