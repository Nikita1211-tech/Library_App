import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  Username: string = '';
  Password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/users/login', { email: this.Username, password: this.Password })
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/main']);
        },
        (error: any) => {
          console.error("Login Failed", error);
        }
      );
  }
}
