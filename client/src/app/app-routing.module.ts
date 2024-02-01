import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'modules/login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }, { path: 'modules/logout', loadChildren: () => import('./modules/logout/logout.module').then(m => m.LogoutModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
