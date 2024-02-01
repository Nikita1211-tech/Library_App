import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private router: Router, private http: HttpClient) {}
  login() {
    this.http.post<String>(`${environment.API_URL}`, {})
      .subscribe(
        // (response) => {
        //   localStorage.setItem('token', response.token);
        //   this.router.navigate(['/main']);
        // },
        // (error: String) => {
        //   console.error("Login Failed", error);
        // }
      );
}
}
