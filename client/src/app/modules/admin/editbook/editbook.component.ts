import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { environment } from '../../../../environments/environment';

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
  // bookCategoryImageUrl: string | null = null;
  // bookTypeImageUrl: string | null = null;
  bookcategories: { name: string, abbrev: string}[] = []
  bookcategoriesimage: {image: string, abbrev: string}[] = []
  booktypes: { name: string, abbrev: string }[] = []
  booktypesimage: {image: string, abbrev: string}[] = []
  constructor(private formBuilder: FormBuilder, private admin: AdminService, private route: ActivatedRoute) {
    this.bookId = this.route.snapshot.params['id'];
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
      // console.log("New array is", booktypearr, this.bookcategories)
      return booktypearr
    })
    this.getBookType().subscribe((booktypesimage) => {
      var arr = booktypesimage
      var booktypeimagearr = arr.map((item: any) => {
        console.log(item)
        return {image: item.image, abbrev: item.image}
      }) 
      this.booktypesimage = booktypeimagearr
      // console.log("New array is", booktypearr, this.bookcategories)
      return booktypeimagearr
    })
  }
   
  ngOnInit(): void {
    // Fetch the book data by its ID and patch the form with the retrieved data
    this.getBookData();
  }

  getBookData(): void {
    this.admin.getBookById(this.bookId).subscribe((books) => {
      this.books = books
      this.bookImageUrl = books.img;
      // this.bookCategoryImageUrl = books.bookcat_img;
      // this.bookTypeImageUrl = books.booktype_img;
      console.log(books)
      const bookcategoryimg = books.bookcat_img
      // Patch the form with the retrieved book data
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
  }

onFileSelected(e: any){
  console.log(e)
}
onEditBook() {
  const updatedData = new FormData();
  Object.keys(this.editBookForm.value).forEach(key => {
    const value = this.editBookForm.value[key];
    updatedData.append(key, value);
  });

      this.admin.updateBook(this.bookId, updatedData, (error) => {
        console.error('Failed to update book:', error)});
        console.log(updatedData);
}
getBookCategory(){
  return this.admin.showbookcategory()
}
getBookType(){
  return this.admin.showbooktype() 
}
}
