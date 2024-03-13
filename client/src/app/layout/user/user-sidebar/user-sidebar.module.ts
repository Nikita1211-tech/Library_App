import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSidebarRoutingModule } from './user-sidebar-routing.module';
import { UserSidebarComponent } from './user-sidebar.component';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    UserSidebarComponent
  ],
  imports: [
    CommonModule,
    UserSidebarRoutingModule,
    PrimeNGConfig,
    PrimeTemplate,
    DropdownModule,
    Sidebar,
    SidebarModule,
    ButtonModule,
    StyleClassModule
  ]
})
export class UserSidebarModule { }
