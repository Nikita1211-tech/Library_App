import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { MainComponent } from './dashboard/main/main.component';
import { BookComponent } from './dashboard/book/book.component';
import { ReaderComponent } from './dashboard/reader/reader.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { AuthGuard } from './auth.guard';
import { BookdescriptionComponent } from './dashboard/bookdescription/bookdescription.component';
import { AddbookComponent } from './dashboard/addbook/addbook.component';

// app-routing.module.ts
export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'reader', component: ReaderComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'bookdescription/:id', component: BookdescriptionComponent, canActivate: [AuthGuard]  },
  { path: 'addbook', component: AddbookComponent, canActivate: [AuthGuard]  },
];
