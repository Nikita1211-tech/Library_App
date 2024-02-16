import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {
  updatePasswordForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
  this.updatePasswordForm =  new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  },
  {
    validators: this.passwordMatchValidator,
  });
 }
 passwordMatchValidator(form: AbstractControl){
  return form.get('password')?.value === form.get('confirmpassword')?.value ? null: { mismatch: true };
}
 onUpdate(): void{
  const email = localStorage.getItem('username')
  const password = this.updatePasswordForm.value.password
  const confirmpassword = this.updatePasswordForm.value.confirmpassword
  this.auth.updatePassword(email, password, (error)=>{
   
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
}
