import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrl: './editbook.component.css'
})
export class EditbookComponent{
  bookId: number 
  books: Book[] = []
  editBookForm: FormGroup;
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
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute ,private admin: AdminService){
    this.bookId = this.route.snapshot.params['id'];
      console.log(this.bookId)
      this.getBookById().subscribe((books) => {
        this.books = books;
        this.editBookForm.patchValue({
        bookname: books.bookName,
        booksellingprice: books.sellingprice,
        bookcostprice: books.costprice,
        bookcategories: books.category,
        booktype: books.booktypename,
        bookwriter: books.writerName,
        publishyear: books.publishyear,
        summary: books.booksummary,
        booktypeimg: books.booktype_img,
        bookcategoryimg: books.bookcat_img,
        img: books.bookcat_img
      });
      })
    this.editBookForm = new FormGroup({
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
//   getBooks(){
//    return this.admin.showbook()
// }
}
onFileSelected(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const bookimgControl = this.editBookForm.get('bookimg');
    if (bookimgControl) {
      bookimgControl.setValue(file);
    }       
  }
}
getBookById(){
  return this.admin.getBookById(this.bookId)
}
// onEditBook(){
//   const updatedData = this.editBookForm.value;
//     this.admin.updateBook(this.bookId, updatedData, (error) => {
//         console.error('Failed to update book:', error)});
//         console.log(updatedData);
// }
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
