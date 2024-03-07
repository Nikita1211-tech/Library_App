import { Component } from '@angular/core';
import { Book } from '../../../data/interfaces/book.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  books: Book[]=[];
  public environment = environment.IMG_URL;
  private API_URL = environment.API_URL
  public chart: any;
  constructor(private router:Router, private http: HttpClient, private admin: AdminService){}
  
  createChart(){
    Chart.defaults.font.family = "'Poppins', sans-serif",
    this.chart = new Chart("MyChart", {
      type: 'line', 
      data: {
        labels: ['MON', 'TUE', 'WED','THU','FRI', 'SAT', 'SUN'], 
         datasets: [
          {
            label: "Subscribe",
            data: ['100', '75', '25', '60', '35','80', '85'],
            backgroundColor: '#FB3453',
            tension: 0.5
          }  
        ]
      },
      options: {
        aspectRatio:2,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        }
      },
    });
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/books`);
  }
  ngOnInit(): void {
    this.createChart();
    this.getBooks().subscribe((books) => {
      this.books = books;
      // this.books[0].img = books.img
      console.log(books)
    });
  }
  // Deletes Book Record
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
