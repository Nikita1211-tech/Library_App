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
          this.router.navigate(['/user-home']);
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
    this.http.post<{email: string}>(this.API_URL+'/resetpassword', obj)
      .subscribe(
        (response) => {
          console.log(response)
          localStorage.setItem('username', response.email)
          this.router.navigate(['/otp']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  } 
}
