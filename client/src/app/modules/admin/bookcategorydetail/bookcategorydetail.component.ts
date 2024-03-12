import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
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
  editcategoryform: FormGroup
  showCategoryForm: Boolean = false
  showTable: boolean = false; 
  visible: boolean = false;
  visibleeditform: boolean = false;
  bookcategoryid: number
  category: Category[] = []
  bookcategoryimg: string | null = null;
  selectedFile: File | null = null;
  id!: number;
  // public chart: any;
  constructor(private fb: FormBuilder,private auth: AuthService, private register: RegisterService, private route: ActivatedRoute, private admin: AdminService, private router: Router, private primengconfig: PrimeNGConfig){
    this.bookcategoryid = this.route.snapshot.params['id'];
    // console.log(this.bookcategoryid)
    this.categoryform = new FormGroup({
      category: new FormControl('', [Validators.required, Validators.pattern(/^[ A-Za-z0-9./]*$/), Validators.minLength(3), Validators.maxLength(40)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:["jpeg","jpg", "png"]}), RxwebValidators.fileSize({maxSize:5000000 })])
    })
    this.editcategoryform = new FormGroup({
      category: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/),  Validators.minLength(6), Validators.maxLength(20)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:['png','jpg','jpeg']}), RxwebValidators.fileSize({maxSize: 5242880}) ])
    })
  }
  ngOnInit(): void {

    this.admin.showbook().subscribe((books) => {
      this.books = books;
      // console.log(books);
    });
    this.admin.showbookcategory().subscribe((categories) => {
      this.categories = categories;
      // console.log(categories.id)
    });
    // this.admin.getBookCategoryById(this.bookcategoryid).subscribe((category) => {
    //   this.category = category
    //   this.bookcategoryimg = category.image
    //   console.log(category.image)
    //   this.editcategoryform.patchValue({ 
    //     category: category.category, 
    //     image: category.image
    //   });
    // })
  }
  // Displays Edit Form 
  showDialog() {
    this.visible = true;
  }
  showEditDialog(id: number) {
    // console.log(id)
    this.visibleeditform = true;
    this.id = id;
    this.admin.getBookCategoryById(id).subscribe((category) => {
      this.category = category
      this.bookcategoryimg = category.image
      console.log(category.image)
      this.editcategoryform.patchValue({ 
        category: category.category, 
        image: category.image
      });
    })
  }
  onClickCategory(data: string): void{
    const bookcategory = data
    localStorage.setItem('bookcategory', bookcategory);
    console.log(bookcategory)
    this.admin.bookcategory(bookcategory, (error) => {
      console.log(error);
    })
  }
  // Edit Form 
  
  getImageFileName(): string {
    const fullPath = this.categoryform.get('image')?.value;
    if (!fullPath) return ''; 
    return fullPath.split('\\').pop() || ''; 
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  getImageUrl(): string | ArrayBuffer | null {
    if (this.selectedFile) {
      console.log(this.environment+this.selectedFile.name)
      return this.selectedFile.name;
    } else {
      console.log(this.environment + this.bookcategoryimg)
      return this.bookcategoryimg;
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

  onAddingCategory(): void{
    console.log("Reached")
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
      });

    }
  }

  onEditingCategory(): void{
    if(!this.editcategoryform.valid) {
      this.markFormGroupTouched(this.editcategoryform);
    } 
    else{
      const formData = new FormData();
      console.log(this.id)
      Object.keys(this.editcategoryform.value).forEach(key => {
        const value = this.editcategoryform.value[key];
        formData.append(key, value);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      this.admin.updatebookcategory(formData, this.id)
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
