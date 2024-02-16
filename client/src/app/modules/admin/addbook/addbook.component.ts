import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
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
  constructor(private fb: FormBuilder, private router: Router, private admin: AdminService){
    this.getBooks().subscribe((books) => {
      this.books = books
      console.log(books)
    })
  this.addBookForm =  new FormGroup({
    bookname: new FormControl('',[ Validators.required, Validators.minLength(8)]),
    bookimg: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    booksellingprice: new FormControl('', [ Validators.required]),
    bookcostprice: new FormControl('', Validators.required),
    bookcategoryimg: new FormControl('',Validators.required),
    bookwriter: new FormControl('', Validators.required),
    booktypeimg: new FormControl('', Validators.required),
    publishyear: new FormControl('', Validators.required),
    booktype: new FormControl(this.booktypes),
    bookcategories: new FormControl(this.bookcategories),
    summary: new FormControl('', Validators.required)
  });
 }
 onAddBook(): void{
  let bookname = this.addBookForm.value.bookname
  let bookimg = this.addBookForm.value.bookimg
  let booksellingprice = this.addBookForm.value.booksellingprice
  let bookcostprice = this.addBookForm.value.bookcostprice
  let bookcategoryimg = this.addBookForm.value.bookcategoryimg
  let bookwriter = this.addBookForm.value.bookwriter
  let booktypeimg = this.addBookForm.value.booktypeimg
  let publishyear = this.addBookForm.value.publishyear
  let booktype = this.addBookForm.value.booktype
  let bookcategories = this.addBookForm.value.bookcategories
  let summary = this.addBookForm.value.summary
  console.log(booktype)
  this.admin.addbook(bookname, bookimg, booksellingprice, bookcostprice, bookcategoryimg, bookwriter, booktypeimg, publishyear, booktype, bookcategories, summary
    ,(error) => {});
 }
 getBooks(){
  return this.admin.showbook()
  // return this.http.get<any[]>(`${this.apiURL}/bookcategory`);
}
}
