import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:3000/api/users';
  constructor( private router: Router,private http: HttpClient) {}
  login() {
    this.http.post<any>('http://localhost:3000/api/users/login', {})
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/main']);
        },
        (error: any) => {
          console.error("Login Failed", error);
        }
      );
}
 
logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}
}
