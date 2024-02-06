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
  register(register: register): void{
    this.http.post(this.API_URL+'/register', register)
      .subscribe(
        (response) => {
          console.log(register)
          this.router.navigate(['/home']);
        },
        (error: String) => {
          console.error("Login Failed", error);
        }
      );
  }
}
