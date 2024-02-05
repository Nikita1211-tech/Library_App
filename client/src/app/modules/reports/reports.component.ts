import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { piechartlabels } from '../../data/constants/piechart-constants';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  public chart: any;
  piechartlabels = piechartlabels.piechartlabels;
  constructor(){}
  ngOnInit(): void {
    this.createChart();
    this.createChart1();
    console.log(this.piechartlabels)
  }
  createChart(){
    Chart.defaults.font.family = "'Poppins', sans-serif",
    this.chart = new Chart("MyChart", {
      type: 'polarArea',
      data: {
        datasets: [{
            data: [10, 20, 30]
        }],
    },
    options: {
      aspectRatio:1.1,
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
