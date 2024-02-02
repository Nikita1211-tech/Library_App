import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  myForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService){
    this.myForm =  new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit(): void{
     const email = this.myForm.value.email
     const password = this.myForm.value.password
     this.auth.login(email, password);
  }
}
