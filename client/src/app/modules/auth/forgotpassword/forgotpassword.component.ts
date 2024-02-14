import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  resetPassword: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.resetPassword =  new FormGroup({
      email: new FormControl(''),
    });
  }
  onReset(): string{
     var email = this.resetPassword.value.email
     this.auth.resetPassword(email, (error) => {
      console.log(error);
     })
     return email;
  }
  // currentUser(): void{
  //   var email = this.resetPassword.value.email
  //   this.auth.setUsername(email);
  // }
}

