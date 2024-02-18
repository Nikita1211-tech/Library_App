import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  bookId: number;
  books: Book[] = []
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
  addBookForm: FormGroup
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private admin: AdminService){
    this.bookId = this.route.snapshot.params['id'];
    console.log(this.bookId);
    this.getBookById().subscribe((books) => {
      this.books = books;
    });
    this.getBooks().subscribe((books) => {
      this.books = books
      console.log(books)
    })
    // this.bookId =  this.route.snapshot.params['id'];
    this.bookId = this.route.snapshot.params['id'];
    console.log(this.bookId);
    this.addBookForm =  new FormGroup({
    bookname: new FormControl('',[ Validators.required, Validators.minLength(8)]),
    bookimg: new FormControl('0', [ Validators.required, Validators.minLength(8)]),
    booksellingprice: new FormControl('', [ Validators.required]),
    bookcostprice: new FormControl('', Validators.required),
    bookcategoryimg: new FormControl('0',Validators.required),
    bookwriter: new FormControl('', Validators.required),
    booktypeimg: new FormControl('0', Validators.required),
    publishyear: new FormControl('', Validators.required),
    booktype: new FormControl(this.booktypes),
    bookcategories: new FormControl(this.bookcategories),
    summary: new FormControl('', Validators.required)
  });
 }

onFileSelected(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const bookimgControl = this.addBookForm.get('bookimg');
    if (bookimgControl) {
      bookimgControl.setValue(file);
    }       
  }
}

onAddBook() {
  const formData = new FormData();
  Object.keys(this.addBookForm.value).forEach(key => {
    const value = this.addBookForm.value[key];
    formData.append(key, value);
  });

  this.admin.addBook(formData, (error) => {
      // Handle error
  });
}
getBookById(){
  return this.admin.getBookById(this.bookId)
}
getBooks(){
  return this.admin.showbook()
}

onDeleteBook(bookId: number): void {
  // Call the deleteBook method from the BookService
  this.admin.deleteBook(bookId).subscribe(
    () => {
      console.log('Book deleted successfully');
      // Optionally, you can perform additional actions after deletion, such as updating the UI
    },
    (error) => {
      console.error('Failed to delete book:', error);
      // Handle error, e.g., show an error message to the user
    }
  );
}
  // edit book
  

    
}
