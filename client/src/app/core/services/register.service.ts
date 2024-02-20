import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { register } from '../../data/interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL= environment.API_URL;
  constructor( private router: Router, private http: HttpClient) {}
  register(register: register, errorCallback: (error: any) => void): void{
    this.http.post(this.API_URL+'/register', register)
      .subscribe(
        (response) => {
          this.router.navigate(['/userhome']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
  verifyuser(email: string, errorCallback: (error: any) => void): void{
    const obj = {
      email: email
    };
    this.http.post<{email: string}>(this.API_URL+'/verifyuser', obj)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/verifyuser']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  } 
  verifyotp(email:string|null, otp: number, errorCallback: (error: any) => void): any{
    const obj = {
      email: email,
      otp: otp
    }
    this.http.post(this.API_URL+'/verifyotp', obj)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/setpassword']);
          return response
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
  saveuser(email: string|null, username: string|null, contact: string|null, password: string, errorCallback: (error: any) => void): void{
      const obj =  {
        email: email,
        username: username,
        contact: contact,
        password: password
      }
      this.http.post(this.API_URL+'/saveuser', obj)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
}
