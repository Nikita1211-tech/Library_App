import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Writer } from '../../main';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
    books: Writer[]=[];
    public chart: any;
    
    ngOnInit(): void {
      this.createChart();
    }
    
    constructor(private router:Router){
      this.books.push(
        {
           book_id: "BOOK123",
           img: "./../../../assets/images/book_2.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },
        {
          book_id: "BOOK124",
           img: "./../../../assets/images/book_1.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },
        {
            book_id: "BOOK125",
            img: "./../../../assets/images/book_3.png", 
            bookName: "The Road Not Taken",
            writerName: "Rovert frost",
            price: "$5000"
        },
        { 
            book_id: "BOOK126",
            img: "./../../../assets/images/book_1.png",
            bookName: "The Road Not Taken",
            writerName: "Rovert frost",
            price: "$5000"
        },
        {
          book_id: "BOOK127",
           img: "./../../../assets/images/book_2.png",
           bookName: "The Road Not Taken",
           writerName: "Rovert frost",
           price: "$5000"
        },

      )
    }
    
    redirecttobookdescription(book_id: String){
      this.router.navigate(['/book', book_id]);
    }
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
}
