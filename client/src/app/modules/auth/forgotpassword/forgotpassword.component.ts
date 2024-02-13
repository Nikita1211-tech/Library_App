import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  resetPassword: FormGroup
  otpform: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.resetPassword =  new FormGroup({
      email: new FormControl(''),
    });
    this.otpform =  new FormGroup({
      email: new FormControl(''),
      otp: new FormControl(''),
    });
  }
  showOtpForm(): void {
    const otpForm= document.getElementById("otpForm");
    const resetForm = document.getElementById("resetPasswordForm");
    if(resetForm){
      resetForm.style.display = "none";
    } else {
      console.error("Element with id 'resetPasswordForm' not found");
    }
    if(otpForm) {
      otpForm.style.display = "flex";
    } else {
      console.error("Element with id 'resetPasswordForm' not found");
    }
  }
  onReset(): void{
     const email = this.resetPassword.value.email
     this.auth.resetPassword(email, (error) => {})
  }
  otp(): void{
    const email = this.resetPassword.value.email
    const otp = this.otpform.value.otp
    this.auth.otp(email, otp, (error)=>{
       console.log(error);
    })
    console.log(email);
    console.log(otp);
  }
}
function onUpdatePassword(email: any) {
  throw new Error('Function not implemented.');
}

