import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Swal from "sweetalert2"

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
  booktypes: { name: string, image: string, abbrev: string}[] = []
  selectedCategoryImage: string | null = null;
  selectedTypeImage: string | null = null;
  showTable: boolean = false; 
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private admin: AdminService){
    this.bookId = this.route.snapshot.params['id'];
    // console.log(this.bookId);
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
      // console.log("New array is",this.bookcategories = bookcategoryarr
      // , this.bookcategories)
      return bookcategoryarr
    })
    this.getBookCategory().subscribe((bookcategoryimage) => {
      var arr = bookcategoryimage
      var bookcategoryimagearr = arr.map((item: any) => {
        // console.log(item)
        return {name: item.image, abbrev: item.image}
      }) 
      this.bookcategoriesimage = bookcategoryimagearr
      // console.log("New array is", newarr, this.bookcategories)
      return bookcategoryimagearr
    })
    this.getBookType().subscribe((booktype) => {
      var arr = booktype
      var booktypearr = arr.map((item: any) => {
        console.log(item)
        return {name: item.type, image:item.image, abbrev: item.type}
      }) 
      this.booktypes = booktypearr
      // console.log("New array is", booktypearr, this.bookcategories)
      return booktypearr
    })
    // this.getBookType().subscribe((booktype) => {
    //   var arr = booktype
    //   var booktypeimagearr = arr.map((item: any) => {
    //     console.log(item)
    //     return {name: item.image, abbrev: item.image}
    //   }) 
    //   this.booktypesimage = booktypeimagearr
    //   // console.log("New array is", booktypearr, this.bookcategories)
    //   return booktypeimagearr
    // })
    // this.bookId =  this.route.snapshot.params['id'];
    this.bookId = this.route.snapshot.params['id'];
    // console.log(this.bookId);
    this.addBookForm =  new FormGroup({
    bookname: new FormControl('',[ Validators.required, Validators.minLength(8)]),
    bookimg: new FormControl('0', [ Validators.required, Validators.minLength(8)]),
    booksellingprice: new FormControl('', [ Validators.required]),
    bookcostprice: new FormControl('', Validators.required),
    bookcategoryimg: new FormControl('',Validators.required),
    bookwriter: new FormControl('', Validators.required),
    booktypeimg: new FormControl('', Validators.required),
    publishyear: new FormControl('', Validators.required),
    booktype: new FormControl(this.booktypes, Validators.required),
    bookcategories: new FormControl(this.bookcategories, Validators.required),
    summary: new FormControl('', Validators.required)
  });
  
 } 
 onFileSelected(event: any, formControlName: string) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const control = this.addBookForm.get(formControlName);
    if (control) {
      control.setValue(file);
      console.log(control.value); 
    }       
    console.log(file)
  }
}

onSelectCategory(): void {
  const selectedValue = this.addBookForm.get('bookcategoryimg')?.value;
  this.selectedCategoryImage = selectedValue ? selectedValue : null;
}
onSelectType(): void {
  const selectedValue = this.addBookForm.get('booktypeimg')?.value;
  this.selectedTypeImage = selectedValue ? selectedValue : null;
}
// onFileSelected(event: any) {
//   if (event.target.files && event.target.files.length > 0) {
//     const file = event.target.files[0];
//     const bookimgControl = this.addBookForm.get('bookimg');
//     if (bookimgControl) {
//       bookimgControl.setValue(file);
//     }       
//   }
// }

onAddBook() {
  if(!this.addBookForm.valid) {
    this.markFormGroupTouched(this.addBookForm);
  } 
  else{
    const formData = new FormData();
    Object.keys(this.addBookForm.value).forEach(key => {
      const value = this.addBookForm.value[key];
      formData.append(key, value);
    });
    this.admin.addBook(formData, (error) => {
    });
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
// onDeleteBook(bookId: number): void {
//   // Call the deleteBook method from the BookService
//   this.admin.deleteBook(bookId).subscribe(
//     () => {
//       console.log('Book deleted successfully');
//       // Optionally, you can perform additional actions after deletion, such as updating the UI
//     },
//     (error) => {
//       console.error('Failed to delete book:', error);
//       // Handle error, e.g., show an error message to the user
//     }
//   );
// }
  // Deletes Book Record
  confirmDelete(bookId: any): void {
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
        this.admin.deleteBook(bookId).subscribe(
          (response) => {
            if(response.message == 'Book deleted successfully'){
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

