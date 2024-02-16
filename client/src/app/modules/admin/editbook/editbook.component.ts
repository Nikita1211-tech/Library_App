import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Book } from '../../../data/interfaces/book.interface';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrl: './editbook.component.css'
})
export class EditbookComponent {
  books: Book[] = []
  constructor(private fb: FormBuilder, private router: Router, private admin: AdminService){
    
    this.getBooks().subscribe((books) => {
      this.books = books
      console.log(books)
    });
  }
 getBooks(){
  return this.admin.showbook()
  // return this.http.get<any[]>(`${this.apiURL}/bookcategory`);
}
}
