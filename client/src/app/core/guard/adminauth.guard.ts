import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// export class AuthGuard implements CanActivate {

//   canActivate(): boolean {
//     if (this.authService.isAdmin()) {
//       return true; // Allow access for admin
//     } else {
//       this.router.navigate(['/main']); // Redirect non-admin users to main screen
//       return false;
//     }
//   }
//   return true;
// }
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; 
    } else {
      this.router.navigate(['/home']); 
      return false;
    }
  }
}


