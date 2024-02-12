import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {
  updatePassword: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.updatePassword =  new FormGroup({
      password: new FormControl(''),
    });
  }
  onUpdatePassword(): void{
    const password = this.updatePassword.value.password
    this.auth.updatePassword(password, (error) => {

    });
  }
}
