import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrl: './verifyuser.component.css'
})
export class VerifyuserComponent {
  verifyform: FormGroup
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private router: Router){
    this.verifyform = new FormGroup({
        otp1: new FormControl('', [Validators.required]),
        otp2: new FormControl('', [Validators.required]),
        otp3: new FormControl('', [Validators.required]),
        otp4: new FormControl('', [Validators.required]),
    })
  }
  onVerify(): void {
    const otp1 = this.verifyform.value.otp1;
    const otp2 = this.verifyform.value.otp2;
    const otp3 = this.verifyform.value.otp3;
    const otp4 = this.verifyform.value.otp4;
    
    const otp = otp1 + otp2 + otp3 + otp4; 
    
    const email = localStorage.getItem('registeruser');
    
    this.register.verifyotp(email, otp, (error) => {
      if(error){
        Swal.fire({
          title: error?.error?.message,
          text: error?.error?.message,
          icon: 'error',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#fb3453",
          timer: 3000
        });
      }
      else{

      }
      }).subscribe(
        (response: any)=>{
          if(response){
             Swal.fire({
              title: response?.response?.message,
              text: response?.response?.message,
              icon: 'error',
              confirmButtonText: 'Okay',
              confirmButtonColor: "#fb3453",
              timer: 3000
            });
          }
        }
      )
  }
  resendotp(): void{
    const otp = this.verifyform.value.otp;
    const email = localStorage.getItem('registeruser')
    this.auth.resendOtp(email, otp, (error) => {

    })
  }
}
