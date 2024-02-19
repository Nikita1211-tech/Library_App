import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  
  otpform: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
  this.otpform =  new FormGroup({
    // email: new FormControl(''),
        otp1: new FormControl('', [Validators.required]),
        otp2: new FormControl('', [Validators.required]),
        otp3: new FormControl('', [Validators.required]),
        otp4: new FormControl('', [Validators.required]),
  });
 }
 
 otp(): void{
    const otp1 = this.otpform.value.otp1;
    const otp2 = this.otpform.value.otp2;
    const otp3 = this.otpform.value.otp3;
    const otp4 = this.otpform.value.otp4;
    
    const otp = otp1 + otp2 + otp3 + otp4; 
  const email = localStorage.getItem('username')
  console.log(email)
  this.auth.otp(email, otp, (error)=>{
   
    if(error){
      Swal.fire({
        title: 'Incorrect otp',
        text: error?.error?.message,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: "#fb3453",
        timer: 3000
      })
    }
    else{
      // this.router.navigate(['/updatepassword']);
    }
})
}
resendotp(): void{
  const otp = this.otpform.value.otp;
  const email = localStorage.getItem('registeruser')
  this.auth.resendOtp(email, otp, (error) => {})
}
}
