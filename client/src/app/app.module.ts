import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/admin/sidebar/sidebar.component';
import { HeaderComponent } from './layout/admin/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonloginComponent } from './shared/component/commonlogin/commonlogin.component';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layout/auth/user-layout/user-layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from './layout/user/user-header/user-header.component';
import { MainLayoutComponent } from './layout/user/main-layout/main-layout.component';
import { NgxUiLoaderBlurredDirective, NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { UserSidebarComponent } from './layout/user/user-sidebar/user-sidebar.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RippleModule } from 'primeng/ripple';
import { TimesIcon } from 'primeng/icons/times';

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsColor: "red",
//   bgsPosition: POSITION.bottomCenter,
//   bgsSize: 40,
//   bgsType: SPINNER.rectangleBounce, 
//   fgsType: SPINNER.chasingDots, 
//   pbDirection: PB_DIRECTION.leftToRight, 
//   pbThickness: 5,
// };

@NgModule(
  {
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    SidebarComponent,
    UserSidebarComponent,
    HeaderComponent,
    CommonloginComponent,
    MainLayoutComponent,
    UserHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    RippleModule,
    TimesIcon,
    SharedModule,
    DropdownModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
