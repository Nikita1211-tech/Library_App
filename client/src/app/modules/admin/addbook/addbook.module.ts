import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbookRoutingModule } from './addbook-routing.module';
import { AddbookComponent } from './addbook.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AddbookComponent
  ],
  imports: [
    CommonModule,
    AddbookRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
  
})
export class AddbookModule { }
