import { Component, OnInit } from '@angular/core';
import { PilotService } from '../../../services/admin/pilots/pilots.service';

@Component({
  selector: 'app-pilot-list',
  templateUrl: './pilot-list.component.html',
  styleUrls: ['./pilot-list.component.scss']
})
export class PilotListComponent implements OnInit {
  dtOptions: any;

  constructor(private pilotService: PilotService) { }
  pilotList: any;
  search = [
    {
      name: "City"
    },
    {
      name: "State"
    },
    {
      name: "Country"
    },
    {
      name: "Zipcode"
    },
    {
      name: "Jobs"
    }
  ]
  ngOnInit() {
    this.dtOptions = {
      pageLength: 10
    };
    this.getAllPilots();
    this.getAllStates();
  }

  getAllPilots() {
    this.pilotService.getAllPilots()
    .subscribe(
      data =>{
        if(data.status) {
          this.pilotList = data.result;
          this.dtOptions = this.pilotList;
        } else if(!data.status) {
          this.pilotList = [];
        }
      }
    );
  }

  getAllStates() {
    this.pilotService.getAllStates()
    .subscribe(
      data => {
        console.log("dd", data)
      }
    )
  }

}
