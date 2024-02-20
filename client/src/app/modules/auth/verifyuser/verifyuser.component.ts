import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrl: './verifyuser.component.css'
})
export class VerifyuserComponent {
  verifyform: FormGroup
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private router: Router){
    this.verifyform = new FormGroup({
        otp1: new FormControl('', [Validators.required]),
        otp2: new FormControl('', [Validators.required]),
        otp3: new FormControl('', [Validators.required]),
        otp4: new FormControl('', [Validators.required]),
    })
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
// Deletion of otp 
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
//  Form Submission 
  onVerify(): void {
    const otp1 = this.verifyform.value.otp1;
    const otp2 = this.verifyform.value.otp2;
    const otp3 = this.verifyform.value.otp3;
    const otp4 = this.verifyform.value.otp4;
    
    const otp = otp1 + otp2 + otp3 + otp4; 
    
    const email = localStorage.getItem('registeruser');
    
    this.register.verifyotp(email, otp, (error) => {
      if(error){
        Swal.fire({
          title: error?.error?.message,
          text: error?.error?.message,
          icon: 'error',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#fb3453",
          timer: 3000
        });
      }
      else{

      }
      }).subscribe(
        (response: any)=>{
          if(response){
             Swal.fire({
              title: response?.response?.message,
              text: response?.response?.message,
              icon: 'error',
              confirmButtonText: 'Okay',
              confirmButtonColor: "#fb3453",
              timer: 3000
            });
          }
        }
      )
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
            this.router.navigate(['/register']).then(() => {
                window.location.reload();
            });
        } else {
            // Stay on the same route
            this.router.navigate(['/verifyuser']);
        }
    });
}

  jumpToNext(event: any, nextInput: any) {
    // if (event.target.value.length === 1) {
    //   nextInput.nativeElement.focus();
    // }
  }
  resendotp(): void{
    const otp = this.verifyform.value.otp;
    const email = localStorage.getItem('registeruser')
    this.register.verifyuser(email, (error) => {

    })
  }
}
