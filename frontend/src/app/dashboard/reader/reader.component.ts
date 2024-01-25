import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent implements OnInit{
  public chart: any;
  constructor(){}
  
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    Chart.defaults.font.family = "'Poppins', sans-serif",
    this.chart = new Chart("MyChart", {
      type: 'bar', 
      data: {
        labels: ['MON', 'TUE', 'WED','THU','FRI', 'SAT', 'SUN'], 
	       datasets: [
          {
            label: "Subscribe",
            data: ['100', '75', '25', '60', '35','80', '85'],
            backgroundColor: '#FB3453',
            barThickness: 25
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
