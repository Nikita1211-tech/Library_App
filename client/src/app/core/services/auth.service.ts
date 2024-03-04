import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

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
    this.http.post<{token: string, role: string}>(this.API_URL+'/login',obj)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token );
          localStorage.setItem('role', response.role);
          var role = localStorage.getItem('role');
          if(role === "Admin"){
            this.router.navigate(['/home']);
          }
          else this.router.navigate(['/userhome']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
  logout(): void{
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
  resetPassword(email: string | null, errorCallback: (error: any) => void): any{
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
          Swal.fire({
            title: "Otp sent",
            width: '400',
            showCancelButton: false,
            showConfirmButton: false,
            customClass: 'swal-wide',
            timer: 1500,
          })
          return response
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
// <<<<<<< HEAD
        console.log(response)
           this.router.navigate(['/userhome']);
           return response
// =======
           console.log(response);
           Swal.fire({
            icon: 'success',
            iconColor: '#fb3453',
            text: "Password updated Successfully",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1000,
          })
           this.router.navigate(['/main']);
// >>>>>>> e282480cc323b487cf84a7199261b2cd6e13ca92 
      },
      (error) => {
        errorCallback(error);
      }
    )
  }
}
