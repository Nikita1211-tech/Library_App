import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../data/interfaces/book.interface';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import { Type } from '../../../data/interfaces/category.interface';
import Swal from 'sweetalert2';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
<<<<<<< HEAD
=======
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
>>>>>>> 5ba9bc53eacad7098ba50c9f883126c50829dbbb

@Component({
  selector: 'app-booktypedetail',
  templateUrl: './booktypedetail.component.html',
  styleUrl: './booktypedetail.component.css'
})
export class BooktypedetailComponent {
  public environment = environment.IMG_URL
  books: Book[] = [];
  types: Type[] = []
  typeform: FormGroup
  showTypeForm: boolean = false;
  showTable: boolean = false; 
  // public chart: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private register: RegisterService, private admin: AdminService, private router: Router){
    this.typeform = new FormGroup({
<<<<<<< HEAD
      type: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/),  Validators.minLength(6), Validators.maxLength(20)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:['png','jpg','jpeg','gif']}), RxwebValidators.fileSize({maxSize:51000000 })])
=======
      type: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      image: new FormControl('', [Validators.required,  RxwebValidators.extension({extensions:["jpeg","jpg", "png"]}), RxwebValidators.fileSize({maxSize:5000000 })])
>>>>>>> 5ba9bc53eacad7098ba50c9f883126c50829dbbb
    })
  }
    
  ngOnInit(): void {
    this.admin.showbook().subscribe((books) => {
      this.books = books;
      console.log(books);
    });
    this.admin.showbooktype().subscribe((types) => {
      this.types = types;
      // console.log(books);
    });
  }

  // showcategoryform(): void{
  //   // if (this.x.style.display === "none") {
  //   //   this.x.style.display = "block";
  //   // } else {
  //   //   x.style.display = "none";
  //   // }
  //   console.log("true")
  // }
  getImageFileName(): string {
    const fullPath = this.typeform.get('image')?.value;
    if (!fullPath) return ''; // Return empty string if no file is selected
    return fullPath.split('\\').pop() || ''; // Extract file name from full path
  }

  onAddingType(): void{
    if(!this.typeform.valid) {
      this.markFormGroupTouched(this.typeform);
    } 
    else{
      const type = this.typeform.value.type.trim()
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (!imageInput || !imageInput.files || !imageInput.files[0]) {
        console.error('No image selected.');
        return;
      }
      const formData = new FormData();
      formData.append('type', type);
      formData.append('image', imageInput.files[0]);
      this.admin.addbooktype(formData, (error: any) => {
       
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

  confirmDelete(id: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete this?',
      icon: 'question',
      iconColor: '#fb3453',
      showCancelButton: true,
      confirmButtonColor: '#68a900',
      cancelButtonColor: '#fb3453',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.deleteBookType(id).subscribe(
          (response) => {
            if(response.message == 'Book Type deleted successfully'){
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
