import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { register } from '../../data/interfaces/register.interface';
import Swal from 'sweetalert2';

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
          return response
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
  verifyuser(email: string | null, username: string | null, number: string | null, errorCallback: (error: any) => void): any{
    const obj = {
      email: email,
      username: username,
      contact: number
    };
    this.http.post<{email: string}>(this.API_URL+'/verifyuser', obj)
      .subscribe(
        (response) => {
          
          console.log(response)
          Swal.fire({
            title: "Otp sent",
            width: '400',
            showCancelButton: false,
            showConfirmButton: false,
            customClass: 'swal-wide',
            timer: 1500,
          })
          this.router.navigate(['/verifyuser']);
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Signup unsuccessful.',
            text: error?.error?.message,
            icon: 'warning',
            iconColor: '#fb3453',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500
          })
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
          Swal.fire({
            icon: 'success',
            iconColor: '#fb3453',
            text: "User Registered Successfully",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
          })
          this.router.navigate(['/usrehome']);
        },
        (error) => {
          errorCallback(error);
        }
      );
  }
}
