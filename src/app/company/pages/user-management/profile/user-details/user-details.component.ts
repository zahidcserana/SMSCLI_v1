import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

const bars = [
  {label: 'store1', data: 20}, {label: 'store2', data: 10}, {label: 'store3', data: 40}, {label: 'store4', data: 50}, {label: 'store5', data: 30}
]

const dous = [
  {label: 'inventory1', data: 20}, {label: 'inventory2', data: 10}, {label: 'inventory3', data: 40}, {label: 'inventory4', data: 50}, {label: 'inventory5', data: 30}
]

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

  chart: Chart[] = [];

  @ViewChild('canvasBar', {read: ElementRef}) canvasBar: ElementRef;
  @ViewChild('canvasDou', {read: ElementRef}) canvasDou: ElementRef;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.barChart();
      this.doughnutChart();
    }, 100);
  }

  barChart(){
    const label = [], data = [];
    for(let a of bars) {
      label.push(a.label);
      data.push(a.data);
    }
    // console.log({label:label, data:data})
    let bar = this.barchartInit({label:label, data:data});
    this.chart['bar'] = new Chart(this.canvasBar.nativeElement, bar);
  }

  private barchartInit(bar){
    return {
      type: 'bar',
      data: {
        labels: bar['label'],
        datasets: [{
          label: 'Stores',
          data:bar['data'],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1 
        }]
      },
      options: {
        scales: {
          yAxes:[{
            ticks: {
              min: 0
            }
          }]
        },
        tooltips: {
          callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                return data.labels[tooltipItem.index]+ ' ('+ dataset.data[tooltipItem.index] + ')';
              }
          }
        }
      }
    }
  }

  doughnutChart(){
    const label = [], data = [];
    for(let a of dous) {
      label.push(a.label);
      data.push(a.data);
    }
    let dou = this.doughnutChartInit({label:label, data:data}); 
    this.chart['dou'] = new Chart(this.canvasDou.nativeElement, dou);
  }

  private doughnutChartInit(dou){
    return{
      type: 'doughnut',
      data:{ 
        labels: dou.label,
        datasets: [{
          data: dou.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        tooltips: {
          callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                return data.labels[tooltipItem.index]+ ' ('+ dataset.data[tooltipItem.index] + '%)';
              }
          }
      }
      }
    }
  }

}
