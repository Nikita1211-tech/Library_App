import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrl: './verifyuser.component.css'
})
export class VerifyuserComponent {
  verifyform: FormGroup
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private router: Router){
    this.verifyform = new FormGroup({

      otp: new FormControl('', [Validators.required]),
    })
  }
  onVerify(): void{
    const otp = this.verifyform.value.otp;
    const email = localStorage.getItem('registeruser')
    console.log(email)
    this.register.verifyotp(email, otp, (error)=>{})
  }
}
