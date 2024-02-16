import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Writer } from '../../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MainComponent, NgFor],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  books: Writer[]=[];
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
