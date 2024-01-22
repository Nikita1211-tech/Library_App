import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from'.././user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
       Username: string='';
       Password: string='';
       constructor(private http: HttpClient){
       }
      onSubmit(){
        
      const user: User = {
        email: this.Username,
        password: this.Password
      }
         console.log(`Username is: ${user.email}, Password is: ${user.password}`);
      }
}
