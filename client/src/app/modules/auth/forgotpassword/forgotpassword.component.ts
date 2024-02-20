import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  resetPassword: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.resetPassword =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    });
  }
  onReset(): string{
     var email = this.resetPassword.value.email
     localStorage.setItem('username', email)
     this.auth.resetPassword(email, (error) => {
      Swal.fire({
        // title: 'Login unsuccessful.',
        text: error?.error.message,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: "#fb3453",
        timer: 3000
      }).then((result) => {
        // this.router.navigate(['/login']);
      });
   });
     return email;
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
            this.router.navigate(['/login']).then(() => {
                window.location.reload();
            });
        } else {
            // Stay on the same route
            this.router.navigate(['/forgotpassword']);
        }
    });
}
  // currentUser(): void{
  //   var email = this.resetPassword.value.email
  //   this.auth.setUsername(email);
  // }
}

