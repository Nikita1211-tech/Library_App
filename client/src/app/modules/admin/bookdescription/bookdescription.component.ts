import { WritePropExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookdescription',
  templateUrl: './bookdescription.component.html',
  styleUrl: './bookdescription.component.css'
})
export class BookdescriptionComponent {
  private apiURL = 'http://localhost:3000/api/users';
  books: Book[]=[];
  bookId: number | undefined;
  bookDetails: any; 

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/books`);
  }
  getBookDetails(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/bookdescription/${bookId}`);
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      console.log(this.bookId);
      this.getBookDetails(this.bookId).subscribe((bookDetails) => {
        this.bookDetails = bookDetails;
        console.log(bookDetails)
      });
    });
    this.getBooks().subscribe((books) => {
      this.books = books;
      console.log(books)
    });
  }
}
