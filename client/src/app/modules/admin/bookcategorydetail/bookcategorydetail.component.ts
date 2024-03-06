import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { Category } from '../../../data/interfaces/category.interface';
import Swal from 'sweetalert2';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PrimeNGConfig } from 'primeng/api';
// import { imageExtensionValidator } from './../../../shared/validators/imageextensionvalidator.ts';

@Component({
  selector: 'app-bookcategorydetail',
  templateUrl: './bookcategorydetail.component.html',
  styleUrl: './bookcategorydetail.component.css'
})
export class BookcategorydetailComponent implements OnInit{
  // x = document.getElementById("categoryform");
  public environment = environment.IMG_URL
  books: Book[]=[];
  categories: Category[]=[];
  categoryform: FormGroup
  showCategoryForm: Boolean = false
  showTable: boolean = false; 
  display: boolean = false;

  // public chart: any;
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private admin: AdminService, private router: Router, private primengconfig: PrimeNGConfig){
    this.categoryform = new FormGroup({
// <<<<<<< HEAD
// =======
      category: new FormControl('', [Validators.required, Validators.pattern(/^[ A-Za-z0-9./]*$/), Validators.minLength(3), Validators.maxLength(40)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:["jpeg","jpg", "png"]}), RxwebValidators.fileSize({maxSize:5000000 })])
// >>>>>>> 5ba9bc53eacad7098ba50c9f883126c50829dbbb
    })
  }
  ngOnInit(): void {

    this.admin.showbook().subscribe((books) => {
      this.books = books;
      // console.log(books);
    });
    this.admin.showbookcategory().subscribe((categories) => {
      this.categories = categories;
      // console.log(books);
    });
    this.primengconfig.ripple = true; 
  }
  // imageExtensionValidator(control: AbstractControl): ValidationErrors | null {
  //   if (!control.value) {
  //     return null;
  //   }
  
  //   const file = control.value as File;
  
  //   if (!file.name) {
  //     return null;
  //   }
  
  //   const fileName = file.name;
  //   const fileExtension = fileName.split('.').pop()?.toLowerCase();
  //   const allowedExtensions = ['jpg', 'jpeg', 'gif'];
  
  //   if (!fileExtension || allowedExtensions.indexOf(fileExtension) === -1) {
  //     return { invalidImageExtension: true };
  //   }
  
  //   return null;
  // }
  // Edit Form 
  showDialog() {
    this.display = true;
  }

  showcategoryform(): void{
    // if (this.x.style.display === "none") {
    //   this.x.style.display = "block";
    // } else {
    //   x.style.display = "none";
    // }
    console.log("true")
  }
  
  getImageFileName(): string {
    const fullPath = this.categoryform.get('image')?.value;
    if (!fullPath) return ''; 
    return fullPath.split('\\').pop() || ''; 
  }
  
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onAddingCategory(): void{
    if(!this.categoryform.valid) {
      this.markFormGroupTouched(this.categoryform);
    } 
    else{
      const category = this.categoryform.value.category.trim()
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (!imageInput || !imageInput.files || !imageInput.files[0]) {
        console.error('No image selected.');
        return;
      }
      const formData = new FormData();
      formData.append('category', category);
      formData.append('image', imageInput.files[0]);
  
      this.admin.addbookcategory(formData, (error: any) => {
        // Handle error if needed
      });

    }
  }

  confirmDelete(id: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete this?',
      icon: 'question',
      iconColor: '#fb3453',
      showCancelButton: true,
      confirmButtonColor: '#68a900',
      cancelButtonColor: '#fb3453',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.deleteBookCategory(id).subscribe(
          (response) => {
            if(response.message == 'Book Category deleted successfully'){
              Swal.fire({
                title: 'Deleted',
                text: response?.message,
                icon: 'success',
                showConfirmButton:false,
                confirmButtonColor: "#fb3453",
                timer: 1500
              }).then((result) => {
                window.location.reload();
              });
            }
          },
          error => {
            console.error('Failed to delete book:', error);
          }
        );
      }
    });
  }
}
