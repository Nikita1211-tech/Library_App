import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';
import { Category, Type } from '../../../data/interfaces/category.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  public environment = environment.IMG_URL
  books: Book[]=[];
  categories : Category[]=[];
  types: Type[]=[];
  // public chart: any;
  constructor(private router:Router, private http: HttpClient, private admin: AdminService){}

  // apiURL = 'http://localhost:3000/api/users';

  // getBooks(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiURL}/booklist`);
  // }
  
  ngOnInit(): void {
    // this.admin.showbooktypelist().subscribe((booktypes) => {
    //   this.books = booktypes;
    //   console.log(booktypes);
    // });
    this.admin.showbook().subscribe((books) => {
      this.books = books;
      console.log(books);
    });
    this.admin.showbookcategory().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
    this.admin.showbooktype().subscribe((types) => {
      this.types = types;
      console.log(types);
    });
  }
  onClickCategory(data: string): void{
    const bookcategory = data
    localStorage.setItem('bookcategory', bookcategory);
    console.log(bookcategory)
    this.admin.bookcategory(bookcategory, (error) => {
      console.log(error);
    })
 }
 onClickType(data: string): void{
  const booktype = data
  localStorage.setItem('booktype', booktype);
  console.log(booktype)
  this.admin.booktype(booktype, (error) => {
    console.log(error);
  })
 }
}
