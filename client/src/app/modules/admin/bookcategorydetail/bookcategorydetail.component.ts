import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-bookcategorydetail',
  templateUrl: './bookcategorydetail.component.html',
  styleUrl: './bookcategorydetail.component.css'
})
export class BookcategorydetailComponent {
  // x = document.getElementById("categoryform");
  public environment = environment.IMG_URL
  books: Book[]=[];
  categoryform: FormGroup
  showCategoryForm: Boolean = false
  // public chart: any;
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private admin: AdminService, private router: Router){
    this.categoryform = new FormGroup({
      category: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/)]),
      image: new FormControl('', Validators.required)
    })
  }
    
  ngOnInit(): void {
    this.admin.showbook().subscribe((books) => {
      this.books = books;
      // console.log(books);
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

  onAddingCategory(): void{
    if(!this.categoryform.valid) {
      this.markFormGroupTouched(this.categoryform);
    } 
    else{
      const category = this.categoryform.value.category
      this.admin.addbookcategory(category, (error: any) => {
       
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
