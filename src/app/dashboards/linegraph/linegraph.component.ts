import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-linegraph',
  templateUrl: './linegraph.component.html',
  styleUrls: ['./linegraph.component.css']
})
export class LinegraphComponent implements OnInit {
  chart = [];
  chart2 = [];

  ngOnChanges() { }

  constructor() { }
  ngOnInit() {

    // var chartEle = (<HTMLCanvasElement>document.getElementById("MyChart")).getContext("3d")
    // this.chart = new Chart(chartEle,
    //   {
    //     type: 'line', //this denotes tha type of chart

    //     data: {
    //       labels: ['2022-05-17', '2022-05-11', '2022-05-12', '2022-05-13',
    //         '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17', '2022-05-19', '2022-05-17'],
    //       datasets: [
    //         {
    //           label: "",
    //           data: ['9', '8.5', '9', '9', '9', '8.7', '9', '8.2', '9'],
    //           borderColor: '#0E9CFF',
    //           backgroundColor: '#9BD0F5',
    //           borderWidth: 1.5
    //         }
    //       ]
    //     },
    //     options: {
    //       title: {
    //         text: '',
    //         display: true
    //       },
    //       elements: {
    //         point: {
    //           radius: 0
    //         }
    //       },
    //       scales: {
    //         y: {
    //           grid: {
    //             drawBorder: false, // <-- this removes y-axis line
    //             lineWidth: 0.5,
    //           }
    //         },
    //         xAxes: [{
    //           display: false,
    //           ticks: {
    //             display: false
    //           }
    //         }],
    //         yAxes: [{
    //           display: false,
    //           ticks: {
    //             display: false
    //           }
    //         }]
    //       },

    //       legend: {
    //         display: false
    //       }
    //     }

    //   }
    //   )


  }

}
