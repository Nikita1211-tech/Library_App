import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  public environment = environment.IMG_URL
  books: Book[]=[];
  public chart: any;
  constructor(private router:Router, private http: HttpClient, private admin: AdminService){}

  apiURL = 'http://localhost:3000/api/users';

  // getBooks(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiURL}/booklist`);
  // }
  
  ngOnInit(): void {
    this.admin.showbook().subscribe((books) => {
      this.books = books;
      console.log(books);
    });
  }
  onClick(data: string): void{
    const bookcategory = data
    localStorage.setItem('bookcategory', bookcategory);
    console.log(bookcategory)
    this.admin.bookcategory(bookcategory, (error) => {
      console.log(error);
    })
 }
}
