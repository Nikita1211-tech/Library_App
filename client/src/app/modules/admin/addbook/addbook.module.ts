import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbookRoutingModule } from './addbook-routing.module';
import { AddbookComponent } from './addbook.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PrimeIcons } from 'primeng/api';

@NgModule({
  declarations: [
    AddbookComponent
  ],
  imports: [
    CommonModule,
    AddbookRoutingModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule,
    DropdownModule,
    InputTextModule
  ]
  
})
export class AddbookModule { }
