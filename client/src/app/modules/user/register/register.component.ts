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
  otpform: FormGroup
  passwordform: FormGroup
  constructor(private fb: FormBuilder, private register: RegisterService, private router: Router){
    this.registerform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // profilepic: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
      // checkpassword: new FormControl('', [Validators.required])
    })
    this.otpform = new FormGroup({
      otp: new FormControl('', Validators.required),
    })
    this.passwordform = new FormGroup({
      
    })
  }
  showOtpForm(): void {
    const registerForm = document.getElementById("registerForm");
    const resetForm = document.getElementById("resetPasswordForm");
    const updateForm = document.getElementById("updatePasswordForm");
    // if(resetForm && updateForm){
    //   resetForm.style.display = "none";
    //   updateForm.style.display = "none";
    // } else {
    //   console.error("Element with id 'resetPasswordForm' not found");
    // }
    // if(otpForm) {
    //   otpForm.style.display = "flex";
    // } else {
    //   console.error("Element with id 'otpPasswordForm' not found");
    // }
  }
  onRegister(): void{
   const obj:register = {
       username:  this.registerform.value.username,
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

