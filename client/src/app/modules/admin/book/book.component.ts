import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  books: Book[]=[];
  public chart: any;
  constructor(private router:Router, private http: HttpClient){}

  apiURL = 'http://localhost:3000/api/users';
 
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/bookcategory`);
  }
  
  
  ngOnInit(): void {
    this.getBooks().subscribe((books) => {
      this.books = books;
      console.log(books)
    });
  }
}
