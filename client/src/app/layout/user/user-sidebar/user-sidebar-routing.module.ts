import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSidebarComponent } from './user-sidebar.component';

const routes: Routes = [{ path: '', component: UserSidebarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSidebarRoutingModule { }
