declare var require: any;
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
const HC_map = require('highcharts/modules/map');
const HC_exporting = require('highcharts/modules/exporting');
const HC_ce = require('highcharts-custom-events');

HC_map(Highcharts);
require('./world')(Highcharts);

HC_exporting(Highcharts);
HC_ce(Highcharts);

// Highcharts.setOptions({
//   title: {
//     style: {
//       color: 'orange'
//     }
//   }
// });
@Component({
  selector: 'app-command-center',
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.scss']
})
export class CommandCenterComponent implements OnInit {
  suffix = [
    { name: 'America' },
    { name: 'UK' }
]
  // For all demos:
  Highcharts = Highcharts;


  chartMap = {
    
    chart: {
      map: 'myMapName'
    },
    plotOptions: {
      map: {
        allAreas: true
      }
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      },
    },
    title: {
      text: ''
  },
  legend: {
    enabled: false
  },
    series: [{
      name: 'Countries',
      color: 'red',
      //mapData: Highcharts.maps['custom/world'] <- MOVED TO chart.map
    }, {
      type: 'mapbubble',
      name: 'Population 2016',
      joinBy: ['name', 'code3'],
      data: [{
          code3: "Nigeria",
          z: 35,
          color: "#f00"
        },
        {
          code3: "Poland",
          z: 29,
          color: "#000"
        },
        {
          code3: "Russia",
          z: 28,
          color: "#cdcdcd"
        },
      ],
      minSize: 20,
      maxSize: '10%',
    }]
  
  }
  constructor() { }

  ngOnInit() {
  }

}
