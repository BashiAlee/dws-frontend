import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  drones: any;
  selectedSuffix;
  showAddDrone: any = false;
  showAddBattery: any = false;
  otherEquipment: any = false;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  constructor() {
    this.drones = [
      {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    },
    {
      title: "DJI Phantom 1",
      description: "With 4K Video Options",
      serial_number: "07DDDSQ0B13240"
    }
  ]
   }

  ngOnInit() {
  }

}
