import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bookcategories',
  templateUrl: './bookcategories.component.html',
  styleUrl: './bookcategories.component.css'
})
export class BookcategoriesComponent {
  public environment = environment.IMG_URL
  books: Book[] = [];
  constructor(private admin: AdminService) {
    const bookcategory = localStorage.getItem('bookcategory')
    this.admin.showBookCategory(bookcategory).subscribe(
      (books) => {
        this.books = books;
        console.log(books);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // ngOnInit(): void {
  //   const bookcategory = localStorage.getItem('bookcategory')
  //   this.admin.showBookCategory(bookcategory).subscribe((books) => {
  //     this.books = books;
  //     console.log(books);
  //   });
  // }
}
