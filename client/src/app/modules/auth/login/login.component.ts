import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { login } from '../../../data/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  @ViewChild('toast') toast: ElementRef<HTMLDivElement>;
  toastMessage: string = ''
  loginform: FormGroup
  constructor(private elementRef: ElementRef, private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.toast = this.elementRef.nativeElement.querySelector('#toast');
    this.loginform =  new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
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
  onSubmit(): void{
     const email = this.loginform.value.email
     const password = this.loginform.value.password
     this.auth.login(email, password, (error) => {
      Swal.fire({
          title: 'Login unsuccessful.',
          text: error?.error.message,
          icon: 'error',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#fb3453",
          timer: 3000
        }).then((result) => {
          this.router.navigate(['/login']);
        });
     });
}
}

