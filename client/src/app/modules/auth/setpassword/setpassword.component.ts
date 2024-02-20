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
//  showPassword: boolean = false;

  // togglePasswordVisibility(): void {
  //   this.showPassword = !this.showPassword;
  //   const inputType = this.showPassword ? 'text' : 'password';
  //   document.getElementById('Password')?.setAttribute('type', inputType);
  // }
  togglePasswordVisibility() {
    const passwordInput = document.getElementById('Password') as HTMLInputElement;
    const passwordIcon = document.querySelector('.toggle-password i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (passwordIcon) {
            passwordIcon.classList.remove('far', 'fa-eye');
            passwordIcon.classList.add('far', 'fa-eye-slash');
        }
    } else {
        passwordInput.type = 'password';
        if (passwordIcon) {
            passwordIcon.classList.remove('far', 'fa-eye-slash');
            passwordIcon.classList.add('far', 'fa-eye');
        }
    }
  }
  toggleConfirmPasswordVisibility() {
    const passwordInput = document.getElementById('confirmpassword') as HTMLInputElement;
    const passwordIcon = document.querySelector('.toggle-confirmpassword i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (passwordIcon) {
            passwordIcon.classList.remove('far', 'fa-eye');
            passwordIcon.classList.add('far', 'fa-eye-slash');
        }
    } else {
        passwordInput.type = 'password';
        if (passwordIcon) {
            passwordIcon.classList.remove('far', 'fa-eye-slash');
            passwordIcon.classList.add('far', 'fa-eye');
        }
    }
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
 onBack(): void{
  // const user = localStorage.getItem('registerusername');
  // const contact = localStorage.getItem('number');
  // const email = localStorage.getItem('registeruser');
  Swal.fire({
    title: "Do you want to go back?",
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
    confirmButtonColor: "#fb3453",
    cancelButtonColor: "#fb3453"
  }).then((result) => {
    if (result.isConfirmed) {
      // window.location.reload();
      this.router.navigate(['/register']);
    }
    else {
      this.router.navigate(['/setpassword'])
    }
  });
  // this.router.navigate(['/register']);
}
}
