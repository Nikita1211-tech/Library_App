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
  bookCategoryImageUrl: string | null = null;
  bookTypeImageUrl: string | null = null;
  booktypes = [
    {name: 'books', abbrev: 'Books'},
    {name: 'magazine', abbrev: 'Magazine'},
    {name: 'journals', abbrev: 'Journals'},
    {name: 'articles', abbrev: 'Articles'},
    {name: 'newspaper', abbrev: 'Newspaper'},
    {name: 'artanddesign', abbrev: 'Art and designs'}
  ];
  bookcategories = [
    {name: 'academic', abbrev: 'Academic'},
    {name: 'art', abbrev: 'Art and Desgin'},
    {name: 'mythological', abbrev: 'Mythological'},
    {name: 'motivational', abbrev: 'Motivational'},
    {name: 'biographies', abbrev: 'Biographies'},
    {name: 'fiction', abbrev: 'Fiction'}
  ];
  constructor(private formBuilder: FormBuilder, private admin: AdminService, private route: ActivatedRoute) {
    this.bookId = this.route.snapshot.params['id'];
    this.editBookForm = this.formBuilder.group({
      bookname: ['', Validators.required],
      booksellingprice: ['', Validators.required],
      bookcostprice: ['', Validators.required],
      bookcategory: ['', Validators.required],
      booktype: ['', Validators.required],
      bookwriter: ['', Validators.required],
      publishyear: ['', Validators.required],
      summary: ['', Validators.required],
      bookimg: [''],
      bookcategoryimg: [''],
      booktypeimg: ['']
    });
  }

  ngOnInit(): void {
    // Fetch the book data by its ID and patch the form with the retrieved data
    this.getBookData();
  }

  getBookData(): void {
    this.admin.getBookById(this.bookId).subscribe((books) => {
      this.books = books
      this.bookImageUrl = books.img;
      this.bookCategoryImageUrl = books.bookcat_img;
      this.bookTypeImageUrl = books.booktype_img;
      // Patch the form with the retrieved book data
      this.editBookForm.patchValue({
        bookname: books.bookName,
        booksellingprice: books.sellingprice,
        bookcostprice: books.costprice,
        bookcategory: books.category,
        booktype: books.booktypename,
        bookwriter: books.writerName,
        publishyear: books.publishyear,
        summary: books.summary,
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

}
