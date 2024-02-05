import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }, 
  { 
    path: 'logout', 
    loadChildren: () => import('./modules/logout/logout.module').then(m => m.LogoutModule) 
  },
  { path: 'home',
    component: HomeComponent, 
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  { path: 'reader', 
    loadChildren: () => import('./modules/reader/reader.module').then(m => m.ReaderModule),
    canActivate: [AuthGuard]
  },
  { path: 'book', 
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule),
    canActivate: [AuthGuard] 
  },
  { path: 'reports', 
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
