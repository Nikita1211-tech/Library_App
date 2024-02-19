import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-bookcategories',
  templateUrl: './bookcategories.component.html',
  styleUrl: './bookcategories.component.css'
})
export class BookcategoriesComponent {
  // responseData: any;
  books: Book[]=[];
  constructor(private admin: AdminService) {
    // const bookcategory = localStorage.getItem('bookcategory')
    // this.admin.showBookCategory(bookcategory).subscribe(
    //   (book) => {
    //     this.books = book;
    //     console.log(book);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }
  ngOnInit(): void {
    const bookcategory = localStorage.getItem('bookcategory')
    this.admin.showBookCategory(bookcategory).subscribe((books) => {
      this.books = books;
      console.log(books);
    });
  }
}
