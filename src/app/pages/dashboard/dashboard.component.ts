import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
declare var google;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: any;
  constructor(
    private authService: AuthenticationService
  ) {
    this.role = this.authService.getCurrentUser().Role;

   }

  ngOnInit() {

    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "value", { role: "style" }],
        ["Gold", 19.3, "#29abe2"],
        ["Silver", 10.49, "#fa972c"],
        ["Copper", 8.94, "#fc5757"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = { title: "value", width: 600, height: 400, bar: { groupWidth: "95%" }, legend: { position: "top" } };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
    }
  }

}
