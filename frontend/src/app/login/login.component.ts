import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
       username: string=''
       password: string=''
       constructor(private http: HttpClient){}
       onSubmit(){
             const loginData = { username: this.username, password: this.password };
              this.http.post('', loginData)
              .subscribe((response: any) => {
                if (response.success) {
                  console.log('Login successful');
                } else {
                  console.error('Login failed', response.message);
                }
              });
            }
}
