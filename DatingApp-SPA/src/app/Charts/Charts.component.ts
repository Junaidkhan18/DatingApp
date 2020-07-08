import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Charts',
  templateUrl: './Charts.component.html',
  styleUrls: ['./Charts.component.css']
})
export class ChartsComponent implements OnInit {
  options: any;
  constructor() {}

  public yAxisTickFormattingFn = this.yAxisTickFormatting.bind(this);

 yAxisTickFormatting(value): any {
   value = value + '423';
   return value;
 }

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        axisLabel: {

          formatter(value) {
              let val = value;
              val = '$' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

              return val;
          }
      },
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
  myYAxisTickFormatting(val) {
    return '$' + val;
}
}
