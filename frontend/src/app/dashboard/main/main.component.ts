import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Writer } from '../../main';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, NgFor, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
    books: Writer[]=[];
    public chart: any;
    constructor(private router:Router, private http: HttpClient){}
    
    // redirecttobookdescription(id: number){
    //   this.router.navigate(['/bookdescription', id]);
    // }
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
