import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Swal from "sweetalert2"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  addBookForm: FormGroup
  public environment = environment.IMG_URL;
  bookId: number;
  books: Book[] = []
  bookcategories: { name: string, image: string, abbrev: string}[] = []
  bookcategoriesimage: { name: string, image: string, abbrev: string}[] = []
  bookImgPreview: string | ArrayBuffer | null = null;
  bookTypeImgPreview: string | ArrayBuffer | null = null;
  booktypes: { name: string, image: string, abbrev: string}[] = [];
  selectedCategoryImage: string | null = null;
  selectedTypeImage: string | null = null;
  selectedCategoryImagePath : string | null = null;
  selectedTypeImagePath : string | null = null;
  showTable: boolean = false; 
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private admin: AdminService){
    this.bookId = this.route.snapshot.params['id'];
    this.getBookById().subscribe((books) => {
      this.books = books;
      console.log(books)
    });
    this.getBooks().subscribe((books) => {
      this.books = books
      console.log(books)
    })
    this.getBookCategory().subscribe((bookcategory) => {
      var arr = bookcategory
      var bookcategoryarr = arr.map((item: any) => {
        console.log(item)
        return {name: item.category, image:item.image, abbrev: item.category}
      }) 
      this.bookcategories = bookcategoryarr
      return bookcategoryarr
    })
    this.getBookCategory().subscribe((bookcategoryimage) => {
      var arr = bookcategoryimage
      var bookcategoryimagearr = arr.map((item: any) => {
        return {name: item.image, abbrev: item.image}
      }) 
      this.bookcategoriesimage = bookcategoryimagearr
      return bookcategoryimagearr
    })
    this.getBookType().subscribe((booktype) => {
      var arr = booktype
      var booktypearr = arr.map((item: any) => {
        console.log(item)
        return {name: item.type, image:item.image, abbrev: item.type}
      }) 
      this.booktypes = booktypearr
      return booktypearr
    })
    this.bookId = this.route.snapshot.params['id'];
    this.addBookForm =  new FormGroup({
    bookname: new FormControl('',[ Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/), Validators.minLength(3), Validators.maxLength(40)]),
    bookimg: new FormControl('', [ Validators.required, RxwebValidators.extension({extensions: [".png", ".jpg", ".jpeg"]}), RxwebValidators.fileSize({maxSize: 5242880})]),
    booksellingprice: new FormControl('', [ Validators.required]),
    bookcostprice: new FormControl('', Validators.required),
    bookcategoryimg: new FormControl('',Validators.required),
    bookwriter: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3), Validators.maxLength(40)]),
    booktypeimg: new FormControl('', Validators.required),
    publishyear: new FormControl('', Validators.required),
    booktype: new FormControl(this.booktypes, Validators.required),
    bookcategories: new FormControl(this.bookcategories, Validators.required),
    summary: new FormControl('', [Validators.required, Validators.maxLength(256)])
  });
  
 } 

//  getImageFileName(): string {
//   const fullPath = this.addBookForm.get('bookimg')?.value;
//   console.log(fullPath)
//   if (!fullPath) return ''; 
//   return fullPath.split('\\').pop() || ''; 
// }
//  onFileSelected(event: any, formControlName: string) {
//   if (event.target.files && event.target.files.length > 0) {
//     const file = event.target.files[0];
//     const control = this.addBookForm.get(formControlName);
//     if (control) {
//       control.setValue(file);
//       console.log(control.value); 
//     }       
//     console.log(file)
//   }
// }
onFileSelected(event: any, controlName: string): void {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.bookImgPreview = reader.result;
      // this.bookTypeImgPreview = reader.result;
    };
    console.log(this.bookImgPreview)
    // console.log(this.bookTypeImgPreview)
  }
  this.addBookForm.get(controlName)?.setValue(file);
}

onSelectCategory(): void {
  const selectedValue = this.addBookForm.get('bookcategoryimg')?.value;
  this.selectedCategoryImage = selectedValue ? selectedValue : null;
}
onSelectType(): void {
  const selectedValue = this.addBookForm.get('booktypeimg')?.value;
  this.selectedTypeImage = selectedValue ? selectedValue : null;
}
// Auto fetch values 
getBookCategoryImage() {
  const selectedCategory = this.addBookForm.controls['bookcategories'].value;
  const category = this.bookcategories.find(cat => cat.name === selectedCategory);
  if (category) {
    this.admin.getCategoryImage(category.name).subscribe((data: any) => {
      this.selectedCategoryImage = this.getImageNameFromData(data);
      this.selectedCategoryImagePath = this.getImagePath(data);
    });
  }
  console.log(this.selectedCategoryImagePath)
}
getBookTypeImage() {
  const selectedType= this.addBookForm.controls['booktype'].value;
  const type = this.booktypes.find(type => type.name === selectedType);
  // console.log(type)
  if (type) {
    this.admin.getTypeImage(type.name).subscribe((data: any) => {
      // console.log(data)
      this.selectedTypeImage = this.getImageNameFromData(data);
      this.selectedTypeImagePath = this.getImagePath(data);
    });
  }
}

getImageNameFromData(data: any): string {
  if (data && data.image) {
    const parts = data.image.split('\\'); 
    return parts[parts.length - 1];
  }
  return ''; 
}

getImagePath(data: any): string {
  if (data && data.image) {
    return data.image; 
  }
  return ''; 
}

markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
}

onAddBook() {
  if (!this.addBookForm.valid) {
    this.markFormGroupTouched(this.addBookForm);
  } else {
    const formData = new FormData();
    Object.keys(this.addBookForm.value).forEach(key => {
      let value = this.addBookForm.value[key];
      if (typeof value === 'string') {
        value = value.replace(/\s{2,}/g, ' ').trim(); 
      }
      formData.append(key, value);
    });
    // const bookImgInput = this.addBookForm.get('bookimg');
    // const bookTypeImgInput = this.addBookForm.get('booktypeimg');
    
    // if (bookImgInput && bookImgInput.value && bookImgInput.value.files) {
    //   const files = bookImgInput.value.files;
    //   if (files.length > 0) {
    //     formData.append('bookimg', files[0]);
    //   }
    // }
    
    // if (bookTypeImgInput && bookTypeImgInput.value && bookTypeImgInput.value.files) {
    //   const files = bookTypeImgInput.value.files;
    //   if (files.length > 0) {
    //     formData.append('booktypeimg', files[0]);
    //   }
    // }

    this.admin.addBook(formData, (error) => {
    });
  }
}

getBookById(){
  return this.admin.getBookById(this.bookId)
}
getBooks(){
  return this.admin.showbook()
}
getBookCategory(){
  return this.admin.showbookcategory()
}
getBookType(){
  return this.admin.showbooktype() 
} 
}

