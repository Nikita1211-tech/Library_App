import { Component } from '@angular/core';
import { book } from '../../../data/interfaces/book.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: book[]=[];
  public chart: any;
  constructor(private router:Router, private http: HttpClient){}
  
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
        aspectRatio:1.6,
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
  apiURL = 'http://localhost:3000/api/users';

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/books`);
  }
  
  
  ngOnInit(): void {
    this.createChart();
    this.getBooks().subscribe((books) => {
      this.books = books;
      console.log(books)
    });
  }
}
