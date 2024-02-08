import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/admin/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./shared/login/login.module').then(m => m.LoginModule) }, 
  { 
    path: 'logout', 
    loadChildren: () => import('./shared/logout/logout.module').then(m => m.LogoutModule) 
  },
  { path: 'home',
    component: HomeComponent, 
    loadChildren: () => import('./modules/admin/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  { path: 'reader', 
    loadChildren: () => import('./modules/admin/reader/reader.module').then(m => m.ReaderModule),
    canActivate: [AuthGuard]
  },
  { path: 'book', 
    loadChildren: () => import('./modules/admin/book/book.module').then(m => m.BookModule),
    canActivate: [AuthGuard] 
  },
  { path: 'reports', 
    loadChildren: () => import('./modules/admin/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard] 
  },
  { path: 'register', 
    loadChildren: () => import('./modules/user/register/register.module').then(m => m.RegisterModule) 
  },
  { path: 'main', 
    loadChildren: () => import('./modules/user/home/home.module').then(m => m.HomeModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
