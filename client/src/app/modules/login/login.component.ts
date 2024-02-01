import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  email = new FormControl();
  myForm = new FormGroup({
    email: new FormControl()
  })
  constructor(private fb: FormBuilder){}
  onSubmit() {
    console.log(this.myForm.value);
  }
}
