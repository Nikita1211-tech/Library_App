import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Writer } from '../../main';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bookdescription',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './bookdescription.component.html',
  styleUrl: './bookdescription.component.css'
})
export class BookdescriptionComponent{
  private apiURL = 'http://localhost:3000/api/users';
  books: Writer[]=[];
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
