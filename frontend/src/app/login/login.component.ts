import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
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
  constructor(private http: HttpClient, public fb: FormBuilder, public authService: AuthService, private authenticationService: AuthService) {}

  onSubmit() {
    this.authenticationService.login();
  }
}
