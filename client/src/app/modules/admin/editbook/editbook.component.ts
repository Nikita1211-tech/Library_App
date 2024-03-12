import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrl: './editbook.component.css'
})
export class EditbookComponent{
  public environment = environment.IMG_URL
  bookId: number 
  books: Book[] = []
  editBookForm: FormGroup;
  bookImageUrl: string | null = null;
  bookimg: string | null = null;
  booktypeImageUrl :  string | null = null;
  selectedFile: File | null = null;
  selectedCategoryImage: string | null = null;
  selectedTypeImage: string | null = null;
  selectedCategoryImagePath : string | null = null;
  selectedTypeImagePath : string | null = null;
  // bookCategoryImageUrl: string | null = null;
  // bookTypeImageUrl: string | null = null;
  bookcategories: { name: string, abbrev: string}[] = []
  bookcategoriesimage: {image: string, abbrev: string}[] = []
  booktypes: {name: string, abbrev: string}[] = [];
  booktypesimage: {image: string, abbrev: string}[] = []
  constructor(private formBuilder: FormBuilder, private router: RouterOutlet, private admin: AdminService, private route: ActivatedRoute) {
    this.bookId = this.route.snapshot.params['id'];
    console.log(this.bookId)
    this.editBookForm = this.formBuilder.group({
      bookname: ['', Validators.required],
      booksellingprice: ['', Validators.required],
      bookcostprice: ['', Validators.required],
      bookcategories: ['', Validators.required],
      booktype: ['', Validators.required],
      bookwriter: ['', Validators.required],
      publishyear: ['', Validators.required],
      summary: ['', Validators.required],
      bookimg: ['', Validators.required],
      bookcategoryimg: ['', Validators.required],
      booktypeimg: ['', Validators.required]
    });
    this.getBookCategory().subscribe((bookcategory) => {
      var arr = bookcategory
      var bookcategoryarr = arr.map((item: any) => {
        // console.log(item)
        return {name: item.category, abbrev: item.category}
      }) 
      this.bookcategories = bookcategoryarr
      // console.log("New array is", newarr, this.bookcategories)
      return bookcategoryarr
    })
    this.getBookCategory().subscribe((bookcategoryimage) => {
      var arr = bookcategoryimage
      var bookcategoryimagearr = arr.map((item: any) => {
        // console.log(item)
        return {image: item.image, abbrev: item.image}
      }) 
      this.bookcategoriesimage = bookcategoryimagearr
      // console.log("New array is", bookcategoryimagearr, this.bookcategories)
      return bookcategoryimagearr
    })
    this.getBookType().subscribe((booktype) => {
      var arr = booktype
      var booktypearr = arr.map((item: any) => {
        console.log(item)
        return {name: item.type, abbrev: item.type}
      }) 
      this.booktypes = booktypearr
      console.log("New array is", booktypearr, this.booktypes)
      return booktypearr
    })
    this.getBookType().subscribe((booktypesimage) => {
      var arr = booktypesimage
      var booktypeimagearr = arr.map((item: any) => {
        console.log(item)
        return {image: item.image, abbrev: item.image}
      }) 
      this.booktypesimage = booktypeimagearr
      console.log("New array is", booktypeimagearr, this.bookcategories)
      return booktypeimagearr
    })
    this.admin.getBookById(this.bookId).subscribe((books) => {
      this.books = books
      this.bookImageUrl = books.img;
      this.booktypeImageUrl = books.booktype_img
      // this.bookCategoryImageUrl = books.bookcat_img;
      // this.bookTypeImageUrl = books.booktype_img;
      console.log(books)
      // console.log('Book Categories:', this.editBookForm.value.bookcategories);
      console.log('Book Categories:', books.category);
      this.editBookForm.patchValue({
        bookname: books.bookName,
        booksellingprice: books.sellingprice,
        bookcostprice: books.costprice,
        bookcategories: books.category,
        booktype: books.booktypename,
        bookwriter: books.writerName,
        publishyear: books.publishyear,
        summary: books.booksummary,
        bookimg: books.img,
        bookcategoryimg: books.bookcat_img,
        booktypeimg: books.booktype_img
      });
    });
    
    console.log('Book Categories:', this.editBookForm.value.bookcategories);
  }
   
  // ngOnInit(): void {
    
  // }

  // onFileSelected(event: any, formControlName: string) {
  //     if (event.target.files && event.target.files.length > 0) {
  //       const file = event.target.files[0];
  //       const control = this.editBookForm.get(formControlName);
  //       if (control) {
  //         control.setValue(file);
  //         console.log(control.value); 
  //       }       
  //       console.log(file)
  //     }
  //   }
    onFileSelected(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.selectedFile = file.name;
      }
      console.log(this.selectedFile)
    }
    getImageUrl(): string | ArrayBuffer | null {
      if (this.selectedFile) {
        console.log(this.environment+this.selectedFile)
        return this.environment+'uploads/'+this.selectedFile;
      } else {
        console.log(this.environment + this.bookimg)
        return this.environment + this.bookimg;
      }
    }
getBookCategoryImage() {
  const selectedCategory = this.editBookForm.controls['bookcategories'].value;
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
  const selectedType= this.editBookForm.controls['booktype'].value;
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
onEditBook() {
  const updatedData = new FormData();
  Object.keys(this.editBookForm.value).forEach(key => {
    const value = this.editBookForm.value[key];
    this.bookImageUrl = this.editBookForm.value[key];
    updatedData.append(key, value);
  });
  // let value = this.addBookForm.value[key];
  if (this.selectedFile) {
    updatedData.append('bookimg', this.selectedFile);
  }
  this.admin.updateBook(this.bookId, updatedData)
  console.log(updatedData);
}
getBookCategory(){
  return this.admin.showbookcategory()
}
getBookType(){
  return this.admin.showbooktype() 
}
}
