import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

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
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
