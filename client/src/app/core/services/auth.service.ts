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
          this.router.navigate(['/userhome']);
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
  resetPassword(email: string | null, errorCallback: (error: any) => void): void{
    const obj = {
      email: email
    };
    this.http.post<{email: string}>(this.API_URL+'/resetpassword', obj)
      .subscribe(
        (response) => {
          console.log(response)
          // localStorage.setItem('username', response.email)
          // console.log(localStorage.getItem('username'))
          this.router.navigate(['/otp']);
          return response;
        },
        (error) => {
          errorCallback(error);
        }
      );
  }   
  otp(email: string|null, otp: number,  errorCallback: (error: any) => void): any{
      const obj = {
        email: email,
        otp: otp,
      }
      this.http.post(this.API_URL+'/otp', obj)
      .subscribe(
        (response) => {
          this.router.navigate(['/updatepassword']);
          return response
        },
        (error) => {
          errorCallback(error);
        }
      )
  }
  resendOtp(email: string|null, otp: number,  errorCallback: (error: any) => void): void{
    const obj = {
      email: email,
      otp: otp,
    };
    this.http.post(this.API_URL+'/resendotp', obj)
    .subscribe(
      (response) => {
        this.router.navigate(['/updatepassword']);
      },
      (error) => {
        errorCallback(error);
      }
    )
  }
  updatePassword(email:string|null, password: string, errorCallback: (error: any) => void): any{
    const obj = {
      email: email,
      password: password,
    }
    console.log(obj.email);
    this.http.post(this.API_URL+'/updatepassword', obj)
    .subscribe(
      (response) => {
           console.log(response);
           this.router.navigate(['/userhome']);
      },
      (error) => {
        errorCallback(error);
      }
    )
  }
}
