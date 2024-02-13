import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  resetPassword: FormGroup
  otpform: FormGroup
  updatePassword: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.resetPassword =  new FormGroup({
      email: new FormControl(''),
    });
    this.otpform =  new FormGroup({
      // email: new FormControl(''),
      otp: new FormControl(''),
    });
    this.updatePassword =  new FormGroup({
      password: new FormControl(''),
    });
  }
  showOtpForm(): void {
    const otpForm = document.getElementById("otpForm");
    const resetForm = document.getElementById("resetPasswordForm");
    const updateForm = document.getElementById("updatePasswordForm");
    if(resetForm && updateForm){
      resetForm.style.display = "none";
      updateForm.style.display = "none";
    } else {
      console.error("Element with id 'resetPasswordForm' not found");
    }
    if(otpForm) {
      otpForm.style.display = "flex";
    } else {
      console.error("Element with id 'otpPasswordForm' not found");
    }
  }
  showUpdatePasswordForm(): void {
    const otpForm = document.getElementById("otpForm");
    const updateForm = document.getElementById("updatePasswordForm");
    if(otpForm){
      otpForm.style.display = "none";
    } else {
      console.error("Element with id 'resetPasswordForm' not found");
    }
    if(updateForm) {
      updateForm.style.display = "flex";
    } else {
      console.error("Element with id 'otpPasswordForm' not found");
    }
  }
  onReset(): string{
     const email = this.resetPassword.value.email
     this.auth.resetPassword(email, (error) => {})
     return email;
  }
  otp(): void{
    const email = this.resetPassword.value.email
    const otp = this.otpform.value.otp
    this.auth.otp(email, otp, (error)=>{
     
      if(error){
        Swal.fire({
          title: 'Incorrect otp',
          text: error?.error?.message,
          icon: 'error',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#fb3453",
          timer: 3000
        }).then((result) => {
          // this.router.navigate(['/otp']);
        });
      }
      else{
        // this.router.navigate(['/updatepassword']);
      }
  })
    console.log(email);
    console.log(otp);
  }
  onUpdatePassword(): void{
    const email = this.resetPassword.value.email
    const password = this.updatePassword.value.password
    this.auth.updatePassword(email, password, (error) => {
    });
  }
}
// function onUpdatePassword(email: any) {
//   throw new Error('Function not implemented.');
// }

