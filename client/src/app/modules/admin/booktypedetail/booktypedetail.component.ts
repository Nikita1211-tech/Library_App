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

@Component({
  selector: 'app-booktypedetail',
  templateUrl: './booktypedetail.component.html',
  styleUrl: './booktypedetail.component.css'
})
export class BooktypedetailComponent {
  public environment = environment.IMG_URL
  books: Book[] = [];
  types: Type[] = []
  booktypes = [
    {name: 'Novel', abbrev: 'Novel'},
    {name: 'Newspaper', abbrev: 'Newspaper'},
    {name: 'Hypothetical', abbrev: 'Hypothetical'},
    {name: 'Research', abbrev: 'Research'},
    {name: 'Article', abbrev: 'Article'},
    {name: 'Magazine', abbrev: 'Magazine'},
    {name: 'Page 3', abbrev: 'Page 3'}
  ];
  typeform: FormGroup
  edittypeform: FormGroup;
  showTypeForm: boolean = false;
  showTable: boolean = false; 
  visible: boolean = false;
  visibleeditform: boolean = false;
  id!: number;
  type: Type[] = []
  booktypeimg: string | null = null;
  selectedFile: File | null = null;
  // public chart: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private register: RegisterService, private admin: AdminService, private router: Router){
    this.typeform = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      image: new FormControl('', [Validators.required, RxwebValidators.extension({extensions:['png','jpg','jpeg']}), RxwebValidators.fileSize({maxSize:5242880 })])
    })
    this.edittypeform = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.pattern(/^[ A-Za-z]*$/), Validators.minLength(3), Validators.maxLength(20)]),
      image: new FormControl('', [Validators.required, RxwebValidators.fileSize({maxSize: 5242880}) ])
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
    if (!fullPath) return ''; 
    return fullPath.split('\\').pop() || ''; 
  }
  // Edit form Modal 
  showDialog() {
    this.visible = true;
  }
  // closeDialog(){
  //   this.visible = false;
  // }
  showEditDialog(id: number) {
    // console.log(id)
    this.visibleeditform = true;
    this.id = id;
    this.admin.getBookTypeById(id).subscribe((type) => {
      this.type = type
      this.booktypeimg = type.image
      console.log(type.image)
      this.edittypeform.patchValue({ 
        type: type.type, 
        image: type.image
      });
    })
  }
  closeDialog() {
    this.visibleeditform = false;
  }
  onClickType(data: string): void{
    const booktype = data
    localStorage.setItem('booktype', booktype);
    console.log(booktype)
    this.admin.booktype(booktype, (error) => {
      console.log(error);
    })
   }
   onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
    console.log(this.selectedFile)
  }
   getImageUrl(): string | ArrayBuffer | null {
    if (this.selectedFile) {
      // console.log(this.environment+this.selectedFile.name)
      console.log(this.selectedFile.name)
      return this.selectedFile.name;
    } else {
      // console.log(this.environment + this.booktypeimg)
      console.log(this.booktypeimg)
      let parts = this.booktypeimg?.split("\\");
      if (parts && parts.length > 0) {
        let fileName = parts[parts.length - 1];
        console.log(fileName)
        return fileName;
      } else {
        return ""; 
      }
    }
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
  onEditingType(): void{
    if(!this.edittypeform.valid) {
      this.markFormGroupTouched(this.edittypeform);
    } 
    else{
      const formData = new FormData();
      Object.keys(this.edittypeform.value).forEach(key => {
        const value = this.edittypeform.value[key];
        formData.append(key, value);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      console.log("Selected File is", this.selectedFile)
      this.admin.updatebooktype(formData, this.id)
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
      confirmButtonText: 'Delete',
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
