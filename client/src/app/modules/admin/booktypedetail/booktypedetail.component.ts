import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../data/interfaces/book.interface';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booktypedetail',
  templateUrl: './booktypedetail.component.html',
  styleUrl: './booktypedetail.component.css'
})
export class BooktypedetailComponent {
  public environment = environment.IMG_URL
  books: Book[]=[];
  typeform: FormGroup
  // public chart: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private register: RegisterService, private admin: AdminService, private router: Router){
    this.typeform = new FormGroup({
      type: new FormControl('', [Validators.required]),
    })
  }
    
  ngOnInit(): void {
    this.admin.showbook().subscribe((books) => {
      this.books = books;
      console.log(books);
    });
  }

  showcategoryform(): void{
    // if (this.x.style.display === "none") {
    //   this.x.style.display = "block";
    // } else {
    //   x.style.display = "none";
    // }
    console.log("true")
  }

  onAddingType(): void{
    if(!this.typeform.valid) {
      this.markFormGroupTouched(this.typeform);
    } 
    else{
      const type = this.typeform.value.type
      // console.log(username);
      // console.log(email);
      // console.log(contact);
      // localStorage.setItem('registeruser', email);
      // localStorage.setItem('registerusername', username);
      // localStorage.setItem('number', contact);
      this.admin.addbooktype(type, (error: any) => {
       
      })

    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
}
}
