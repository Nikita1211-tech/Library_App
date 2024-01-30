import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  public chart: any;
  constructor(){}
  
  ngOnInit(): void {
    this.createChart();
    this.createChart1();
  }
  createChart(){
    Chart.defaults.font.family = "'Poppins', sans-serif",
    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        datasets: [{
            data: [10, 20, 30]
        }],
    },
    options: {
      aspectRatio:1,
    },
    });
  }
  createChart1(){
    Chart.defaults.font.family = "'Poppins', sans-serif",
    this.chart = new Chart("Mychart", {
      type: 'doughnut',
      data: {
        datasets: [{
            data: [10, 20]
        }],
    },
    options: {
      aspectRatio:1,
    },
    });
  }

}
