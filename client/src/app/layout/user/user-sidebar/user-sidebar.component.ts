import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit{
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
  closeCallback(e: any): void {
      this.sidebarRef.close(e);
  }  
  sidebarVisible: boolean = false;
}
