import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrl: './setpassword.component.css'
})
export class SetpasswordComponent {
  setPasswordForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
  this.setPasswordForm =  new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  });
 }
 onSetPasswsord(): void{
  console.log("Hello");
 }
}
