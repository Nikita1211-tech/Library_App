import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../core/services/register.service';
import { register } from '../../../data/interfaces/register.interface';
// import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // submitted = false;
  registerform: FormGroup
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private router: Router){
    this.registerform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/), Validators.minLength(8), Validators.maxLength(15)]),
      mail: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      contact: new FormControl('',[ Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })
  }
  // onClick(): void{
  //   if (this.registerform.valid) {
  //     console.log('Form submitted successfully');
  //   } else {
  //     this.markFormGroupTouched(this.registerform);
  //   }
  // }
  onRegister(): void{
    if(!this.registerform.valid) {
      this.markFormGroupTouched(this.registerform);
    } 
    else{
      const username = this.registerform.value.username
      const email = this.registerform.value.mail
      const contact = this.registerform.value.contact
      // console.log(username);
      // console.log(email);
      // console.log(contact);
      localStorage.setItem('registeruser', email);
      localStorage.setItem('registerusername', username);
      localStorage.setItem('number', contact);
      this.register.verifyuser(email, username, contact, (error: any) => {
       
      })

    }
    }
    markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
    
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
}

}
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



