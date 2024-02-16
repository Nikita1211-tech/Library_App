import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../core/services/register.service';
import { register } from '../../../data/interfaces/register.interface';
// import { HttpErrorResponse } from '@angular/common/http';
// import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerform: FormGroup
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private router: Router){
    this.registerform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('',[ Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })
  }
  onRegister(): void{
   const username = this.registerform.value.username
   const email = this.registerform.value.mail
   const contact = this.registerform.value.contact
   console.log(username);
   console.log(email);
   console.log(contact);
   localStorage.setItem('registeruser', email);
   localStorage.setItem('registerusername', username);
   localStorage.setItem('number', contact);
   this.register.verifyuser(email, (error)=>{

   })
  //  this.register.register(obj, (error) => {
  //   if(error?.error?.message === "User already exists"){
  //     // Swal.fire({
  //     //   title: 'Signup unsuccessful.',
  //     //   text: 'User already exists',
  //     //   icon: 'warning',
  //     //   confirmButtonText: 'Okay',
  //     //   timer: 2000
  //     // }).then((result) => {
  //     //   this.router.navigate(['/register']);
  //     // });
  //   }
  //   else{
  //     this.router.navigate(['/home']);
  //   }
  //  })
 }
 otp(): void{
    
 }
}

