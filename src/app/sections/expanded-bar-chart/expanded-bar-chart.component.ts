import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-expanded-bar-chart',
  templateUrl: './expanded-bar-chart.component.html',
  styleUrls: ['./expanded-bar-chart.component.css']
})
export class ExpandedBarChartComponent implements OnInit , OnChanges  {

  chart = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
 
  ngOnInit() {
    var ctx = document.getElementById('canvas');
    var stackedBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Laptop','Server','Cables','Softwares','NetComm'],
            datasets: [
            {
                label: ['apple','microsoft','jack','adobe','t3'],
                data: [67.8,70,68,85,40],
                backgroundColor: '#007199',
            },
            {
                label: ['lenovo','Azure','hdmi','O365','orange'],
                data: [20.7,20,10,10,20],
                backgroundColor: '#F5B428',
            },
            {
                label: ['Notebook','AWS','usb','Nortan','jio'],
                data: [11.4,10,22,5,40],
                backgroundColor: '#009383',
            }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines:{
                        display: true
                    },
                    stacked: true
                }],
                yAxes: [{
                    gridLines:{
                        display: false
                    },
                    stacked: true
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label[tooltipItem.index] || '';
                if (label) {
                    label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                label += '%';
                return label;
                }
            }
            }
        }
    });
}
}