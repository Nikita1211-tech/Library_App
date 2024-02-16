import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrl: './setpassword.component.css'
})
export class SetpasswordComponent {
  setPasswordForm: FormGroup
  constructor(private fb: FormBuilder, private register: RegisterService, private router: Router){
  this.setPasswordForm =  new FormGroup({
    password: new FormControl('',[ Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('', [ Validators.required, Validators.minLength(8)])
  },
  
  {
    validators: this.passwordMatchValidator,
  }
  );
 }
 passwordMatchValidator(form: AbstractControl){
     return form.get('password')?.value === form.get('confirmpassword')?.value ? null: { mismatch: true };
 }
 onSetPassword(): void{
  const password = this.setPasswordForm.value.password
  const email = localStorage.getItem('registeruser')
  const username = localStorage.getItem('registerusername')
  const contact = localStorage.getItem('number')
  this.register.saveuser(email, username, contact, password, (error) => {
    if(error?.error?.message === "User already exists"){
          Swal.fire({
            title: 'Signup unsuccessful.',
            text: 'User already exists',
            icon: 'warning',
            confirmButtonText: 'Okay',
            confirmButtonColor: "#fb3453",
            timer: 2000
          })
        }
  })
 }
}
