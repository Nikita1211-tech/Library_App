import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/admin/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  // Admin Component routing starts 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    children: [
      {
        path: 'home',
        redirectTo: '/home',
        loadChildren: () => import('./modules/admin/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'reader',
        loadChildren: () => import('./modules/admin/reader/reader.module').then(m => m.ReaderModule),
      },
      {
        path: 'book',
        loadChildren: () => import('./modules/admin/book/book.module').then(m => m.BookModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/admin/reports/reports.module').then(m => m.ReportsModule),
      },
    ]
  },
   // Admin Component routing ends 
   // User Component routing starts 
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./modules/auth/logout/logout.module').then(m => m.LogoutModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./modules/user/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'main',
        loadChildren: () => import('./modules/user/home/home.module').then(m => m.HomeModule)
      },
      { 
        path: 'forgotpassword', 
        loadChildren: () => import('./modules/auth/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule) 
      },
      { 
        path: 'user-home', 
        loadChildren: () => import('./modules/user/user-home/user-home.module').then(m => m.UserHomeModule) 
      }
    ]
  },
  // User Component routing ends 
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
