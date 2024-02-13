import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../core/services/register.service';
import { register } from '../../../data/interfaces/register.interface';
// import { HttpErrorResponse } from '@angular/common/http';
// import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerform: FormGroup
  constructor(private fb: FormBuilder, private register: RegisterService, private router: Router){
    this.registerform = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      profilepic: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      checkpassword: new FormControl('', [Validators.required])
    })
  }
  onRegister(): void{
   const obj:register = {
       firstname:  this.registerform.value.firstname,
       lastname: this.registerform.value.lastname,
       profilepic: this.registerform.value.profilepic,
       email:  this.registerform.value.email,
       password: this.registerform.value.password,
       role: "User"
   } 
   this.register.register(obj, (error) => {
    if(error?.error?.message === "User already exists"){
      // Swal.fire({
      //   title: 'Signup unsuccessful.',
      //   text: 'User already exists',
      //   icon: 'warning',
      //   confirmButtonText: 'Okay',
      //   timer: 2000
      // }).then((result) => {
      //   this.router.navigate(['/register']);
      // });
    }
    else{
      this.router.navigate(['/home']);
    }
   })
 }
}

