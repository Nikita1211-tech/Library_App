import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { AdminService } from '../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-booktypes',
  templateUrl: './booktypes.component.html',
  styleUrl: './booktypes.component.css'
})
export class BooktypesComponent {
  public environment = environment.IMG_URL
  books: Book[] = [];
  constructor(private admin: AdminService) {
    const booktype = localStorage.getItem('booktype')
    this.admin.showBookType(booktype).subscribe(
      (books) => {
        this.books = books;
        console.log(books);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
