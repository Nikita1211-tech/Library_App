import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {
  updatePasswordForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
  this.updatePasswordForm =  new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/)]),
    confirmpassword: new FormControl('', Validators.required)
  },
  {
    validators: this.passwordMatchValidator,
  });
 }

 passwordMatchValidator(form: AbstractControl){
  return form.get('password')?.value === form.get('confirmpassword')?.value ? null: { mismatch: true };
}

togglePasswordVisibility() {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
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
 onUpdate(): void{
  if(!this.updatePasswordForm.valid) {
    this.markFormGroupTouched(this.updatePasswordForm);
  } 
  else{

    const email = localStorage.getItem('username')
    const password = this.updatePasswordForm.value.password
    const confirmpassword = this.updatePasswordForm.value.confirmpassword
    this.auth.updatePassword(email, password, (error)=>{
     
      // if(error){
      //   Swal.fire({
      //     title: error?.error?.message,
      //     text: error?.error?.message,
      //     icon: 'success',
      //     confirmButtonText: 'Okay',
      //     confirmButtonColor: "#fb3453",
      //     timer: 3000
      //   }).then((result) => {
      //     // this.router.navigate(['/otp']);
      //   });
      // }
      // else{
      //   // this.router.navigate(['/updatepassword']);
      // }
  })
  }
}
markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  })
}
// Back Button 
onBack(): void {
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
          // Redirect to register page and reload the window
          this.router.navigate(['/forgotpassword']).then(() => {
              window.location.reload();
          });
      } else {
          // Stay on the same route
          this.router.navigate(['/updatepassword']);
      }
  });
}
}
