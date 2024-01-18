import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from'.././user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
       Username: string='';
       Password: string='';
       constructor(private http: HttpClient){}
            onSubmit(){
              
            const user: User = {
              username: this.Username,
              password: this.Password
            }
               console.log(`Username is: ${user.username}, Password is: ${user.password}`);
            }
}
