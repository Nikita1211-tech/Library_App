import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isDropdownOpen = false;
  sidebarVisible: boolean = false;
  // Dropdown Code 
  dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // isMenuVisible: boolean = false;

  // toggleMenu() {
  //   this.isMenuVisible = !this.isMenuVisible;
  // }
}
