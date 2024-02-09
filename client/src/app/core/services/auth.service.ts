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
  login(email: string, password: string, errorCallback: (error: any) => void): void{
    const obj = {
      email: email,
      password: password
    };
    this.http.post<{token: string}>(this.API_URL+'/login',obj)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token );
          this.router.navigate(['/user-home']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
  logout(): void{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }
  resetPassword(email: string, errorCallback: (error: any) => void): void{
    const obj = {
      email: email,
    };
    this.http.post<{otp: number}>(this.API_URL+'/resetpassword',obj)
      .subscribe(
        (response) => {
          const otp = response.otp;
          console.log(otp);
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
}
