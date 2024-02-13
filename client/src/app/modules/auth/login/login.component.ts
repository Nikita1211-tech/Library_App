import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
// import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginform: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.loginform =  new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit(): void{
     const email = this.loginform.value.email
     const password = this.loginform.value.password
     this.auth.login(email, password, (error) => {
      if(error){
        // Swal.fire({
        //   title: 'Login unsuccessful.',
        //   text: error?.error?.message,
        //   icon: 'error',
        //   confirmButtonText: 'Okay',
        //   confirmButtonColor: "#fb3453",
        //   timer: 3000
        // }).then((result) => {
        //   this.router.navigate(['/login']);
        // });
      }
     });
  }
}
