import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { role } from '../../data/intefaces/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  selectedRole: role = { User: 'User', Admin: 'Admin' };
  myForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService){
    this.myForm =  new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
    });
  }
  onSubmit(): void{
     const email = this.myForm.value.email
     const password = this.myForm.value.password
     const role = this.myForm.value.role
     console.log(role);
     this.auth.login(email, password, role);

  }
}
