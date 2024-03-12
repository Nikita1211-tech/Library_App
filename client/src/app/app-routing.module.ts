import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/admin/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/auth/user-layout/user-layout.component';
import { HashLocationStrategy } from '@angular/common';
import { MainLayoutComponent } from './layout/user/main-layout/main-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/adminauth.guard';
import { UserAuthGuard } from './core/guard/userauth.guard';
const routes: Routes = [
  // Landingpage route 
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  // Admin Component routing starts 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
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
        path: 'addbook', 
        loadChildren: () => import('./modules/admin/addbook/addbook.module').then(m => m.AddbookModule) 
      },
      { 
        path: 'editbook/:id', 
        loadChildren: () => import('./modules/admin/editbook/editbook.module').then(m => m.EditbookModule) 
      },
      { 
        path: 'bookcategories', 
        loadChildren: () => import('./modules/admin/bookcategories/bookcategories.module').then(m => m.BookcategoriesModule) 
      },
      { 
        path: 'editbookcategory/:id', 
        loadChildren: () => import('./modules/admin/editbookcategory/editbookcategory.module').then(m => m.EditbookcategoryModule) 
      },
      { 
        path: 'booktypes', 
        loadChildren: () => import('./modules/admin/booktypes/booktypes.module').then(m => m.BooktypesModule) 
      },
      { 
        path: 'editbooktype/:id', 
        loadChildren: () => import('./modules/admin/editbooktype/editbooktype.module').then(m => m.EditbooktypeModule) 
      },
      { 
        path: 'bookdescription/:id', 
        loadChildren: () => import('./modules/admin/bookdescription/bookdescription.module').then(m => m.BookdescriptionModule) 
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/admin/reports/reports.module').then(m => m.ReportsModule),
      },
      { 
        path: 'bookcategorydetail', 
        loadChildren: () => import('./modules/admin/bookcategorydetail/bookcategorydetail.module').then(m => m.BookcategorydetailModule) 
      },
      { 
        path: 'booktypedetail', 
        loadChildren: () => import('./modules/admin/booktypedetail/booktypedetail.module').then(m => m.BooktypedetailModule) 
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
        loadChildren: () => import('./modules/auth/register/register.module').then(m => m.RegisterModule)
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
        path: 'otp', 
        loadChildren: () => import('./modules/auth/otp/otp.module').then(m => m.OtpModule) 
      },
      { 
        path: 'updatepassword', 
        loadChildren: () => import('./modules/auth/updatepassword/updatepassword.module').then(m => m.UpdatepasswordModule) 
      },
      { 
        path: 'verifyuser', 
        loadChildren: () => import('./modules/auth/verifyuser/verifyuser.module').then(m => m.VerifyuserModule) 
      },
      { 
        path: 'setpassword', 
        loadChildren: () => import('./modules/auth/setpassword/setpassword.module').then(m => m.SetpasswordModule) 
      },
    ]
  },
  // User Component routing ends 
  // Main Component routing starts 
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [UserAuthGuard],
    children: [
      { 
        path: 'userhome', 
        loadChildren: () => import('./modules/main/userhome/userhome.module').then(m => m.UserhomeModule) 
      },
      { 
        path: 'userprofile', 
        loadChildren: () => import('./modules/main/userprofile/userprofile.module').then(m => m.UserprofileModule) 
      },
    ]
  },
  // { path: 'layout/user/user-sidebar', loadChildren: () => import('./layout/user/user-sidebar/user-sidebar.module').then(m => m.UserSidebarModule) },
  
  
  
  
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}