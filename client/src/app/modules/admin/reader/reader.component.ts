import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { grapphconstants } from '../../../data/constants/graph-constants';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent implements OnInit{
  public chart: any;
  graphlabel = grapphconstants.graphlabels;
  graphdata = grapphconstants.graphdata;
  constructor(){}
  ngOnInit(){
    this.createchart();
  }
  createchart(){
    Chart.defaults.font.family = "'Poppins', sans-serif",
    this.chart = new Chart("mychart", {
      type: 'bar', 
      data: {
        labels: this.graphlabel, 
	       datasets: [
          {
            label: "Subscribe",
            data: this.graphdata,
            backgroundColor: '#FB3453',
            barThickness: 25
          }  
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio:1.5,
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
