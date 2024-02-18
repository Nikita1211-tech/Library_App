import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

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
    otp: new FormControl('', Validators.required),
  });
 }
 
 otp(): void{
  const otp = this.otpform.value.otp
  const email = localStorage.getItem('username')
  console.log(email)
  this.auth.otp(email, otp, (error)=>{
   
    if(error){
      // Swal.fire({
      //   title: 'Incorrect otp',
      //   text: error?.error?.message,
      //   icon: 'error',
      //   confirmButtonText: 'Okay',
      //   confirmButtonColor: "#fb3453",
      //   timer: 3000
      // }).then((result) => {
      //   // this.router.navigate(['/otp']);
      // });
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
