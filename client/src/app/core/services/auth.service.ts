import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { role } from '../../data/intefaces/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentuserrole: role | null = null
  private API_URL= environment.API_URL;
  constructor( private router: Router, private http: HttpClient) {}
  login(email: string, password: string, role: role): void{
    this.currentuserrole = role
    const obj = {
      email: email,
      password: password
    };
    this.http.post<{token: string}>(this.API_URL+'/login',obj)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token );
          this.router.navigate(['/home']);
        },
        (error: String) => {
          console.error("Login Failed", error);
        }
      );
  }
  logout(): void{
      this.currentuserrole = null
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }
  getcurrentuserrole(): role | null {
    return this.currentuserrole;
  }
  hasRole(role: 'User' | 'Admin'): boolean {
    return this.currentuserrole?.[role] === role;
  }
}
