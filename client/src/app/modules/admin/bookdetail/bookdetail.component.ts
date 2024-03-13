import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../../data/interfaces/book.interface';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.css'
})
export class BookdetailComponent {
  books: Book[]=[];
  public environment = environment.IMG_URL;
  private API_URL = environment.API_URL
  public chart: any;
  constructor(private router:Router, private http: HttpClient, private admin: AdminService){}
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/books`);
  }
  ngOnInit(): void {
    this.getBooks().subscribe((books) => {
      this.books = books;
      // this.books[0].img = books.img
      console.log(books)
    });
  }
  confirmDelete(bookId: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete this?',
      icon: 'question',
      iconColor: '#fb3453',
      showCancelButton: true,
      confirmButtonColor: '#68a900',
      cancelButtonColor: '#fb3453',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.deleteBook(bookId).subscribe(
          (response) => {
            if(response.message == 'Book deleted successfully'){
              Swal.fire({
                title: 'Deleted',
                text: response?.message,
                icon: 'success',
                showConfirmButton:false,
                confirmButtonColor: "#fb3453",
                timer: 1500
              }).then((result) => {
                window.location.reload();
              });
            }
          },
          error => {
            console.error('Failed to delete book:', error);
          }
        );
      }
    });
  }
}
