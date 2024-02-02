import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL= environment.API_URL;
  constructor( private router: Router, private http: HttpClient) {}
  login(email: string, password: string){
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
  logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }
}
