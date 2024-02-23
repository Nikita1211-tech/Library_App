import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  
  otpform: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
  this.otpform =  new FormGroup({
    // email: new FormControl(''),
        otp1: new FormControl('', [Validators.required]),
        otp2: new FormControl('', [Validators.required]),
        otp3: new FormControl('', [Validators.required]),
        otp4: new FormControl('', [Validators.required]),
  });
 }
//  Move to next otp input 
moveToNext(event: any, nextInputIndex: number | null) {
  const input = event.target;
  const maxLength = parseInt(input.getAttribute('maxlength'), 10);

  if (input.value.length >= maxLength) {
      if (nextInputIndex !== null) {
          const nextInput = document.getElementById(`otp${nextInputIndex}`);
          if (nextInput) {
              nextInput.focus();
          }
      } else {
          input.blur(); // Remove focus after last input
      }
  }
}
//  move to back otp 
handleDeletion(event: KeyboardEvent, currentIndex: number | null) {
  const input = event.target as HTMLInputElement;

  // Check if Backspace key is pressed and the input field is empty
  if (event.key === 'Backspace' && input.value.length === 0) {
      // Handle Backspace when the input field is empty
      if (currentIndex !== null && currentIndex !== 1) { // Exclude the first input
          const prevInput = document.getElementById(`otp${currentIndex - 1}`) as HTMLInputElement;
          if (prevInput) {
              prevInput.focus();
          }
      }
  }
}
 otp(): void{
    const otp1 = this.otpform.value.otp1;
    const otp2 = this.otpform.value.otp2;
    const otp3 = this.otpform.value.otp3;
    const otp4 = this.otpform.value.otp4;
    
    const otp = otp1 + otp2 + otp3 + otp4; 
  const email = localStorage.getItem('username')
  console.log(email)
  this.auth.otp(email, otp, (error)=>{
   
    if(error){
      Swal.fire({
        title: 'Incorrect otp',
        text: error?.error?.message,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: "#fb3453",
        timer: 3000
      })
    }
    else{
      // this.router.navigate(['/updatepassword']);
    }
})
}
resendotp(): void{
  const email = localStorage.getItem('username')
  this.auth.resetPassword(email, (error) => {
   Swal.fire({
     // title: 'Login unsuccessful.',
     text: error?.error.message,
     icon: 'error',
     confirmButtonText: 'Okay',
     confirmButtonColor: "#fb3453",
     timer: 3000
   }).then((result) => {
     this.router.navigate(['/login']);
   });
});
  // return email;
}
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
          this.router.navigate(['/otp']);
      }
  });
}
}
