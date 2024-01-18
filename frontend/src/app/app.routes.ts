import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { HeaderComponent } from './dashboard/header/header.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'header', component: HeaderComponent}
];
