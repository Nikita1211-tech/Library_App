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
    this.http.post<{otp: number}>(this.API_URL+'/resetpassword', obj)
      .subscribe(
        (response) => {
          console.log(response.otp)
        },
        (error) => {
          errorCallback(error);
        }
      );
  }   
  otp(email: string, otp: number,  errorCallback: (error: any) => void): void{
      const obj = {
        email: email,
        otp: otp,
      };
      console.log(email)
      console.log(otp)
      this.http.post(this.API_URL+'/otp', obj)
      .subscribe(
        (response) => {
          this.router.navigate(['/updatepassword']);
        },
        (error) => {
          errorCallback(error);
        }
      )
  }
  updatePassword(password: string, errorCallback: (error: any) => void): void{
    const obj = {
      password: password,
    }
    this.http.post(this.API_URL+'/updatepassword', obj)
    .subscribe(
      (response) => {

      },
      (error) => {
        errorCallback(error);
      }
    )
  }
}
