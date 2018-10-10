import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  drones: any;
  submittedEquipment: any = false;
  submittedDrone: any = false;
  addDrone: FormGroup;
  addEquipment: FormGroup;
  equipments: any;
  selectedSuffix;
  showAddDrone: any = false;
  otherEquipment: any = false;
  updateEquipment: any = false;
  updateDrone: any = false;
  loaders: any;
  selectedDrone: any;
  selectedEquipment: any;
  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) {
    
    this.addDrone = this.formBuilder.group({
      UserId: [1],
      PilotId: [1],
      DroneTitle: ['',Validators.required],
      Description:['',Validators.required],
      SerialNumber: ['',Validators.required]
    })
    this.addEquipment = this.formBuilder.group({
      UserId: [1],
      PilotId: [1],
      EquipmentTitle: ['',Validators.required],
      Description: ['',Validators.required]
    })


    this.loaders = {};
    this.getAllDronesByID('1');
    this.getAllEquipmentsByID('1');
   }

  ngOnInit() {
  }
  toggleDrone() {
    this.updateDrone = false;
    this.showAddDrone=!this.showAddDrone
  }

  toggleEquipment() {
    this.updateEquipment = false;
    this.otherEquipment=!this.otherEquipment
  }
  editRow(value, type) {
    if(type=='drone') {
      this.selectedDrone = value;
      this.showAddDrone = true;
      this.updateDrone = true;
      this.addDrone.patchValue(Object.assign({}, value));
    }
    if(type=='equipment') {
      this.selectedEquipment = value;
      this.updateEquipment = true;
      this.otherEquipment = true;
      this.addEquipment.patchValue(Object.assign({}, value));
    }
    
  }
  get dronesForm() { return this.addDrone.controls; }
  get equipmentForm() { return this.addEquipment.controls; }
  getAllDronesByID(id) {
    this.loaders.droneLoader = true;
    this.profileService.getDronesByID(id)
    .subscribe(
      data => {
        if(data.status) {
          this.loaders.droneLoader = false;
          this.drones = data.result;
        } else if(!data.status) {
          this.loaders.droneLoader = false;
          this.drones = [];
        }
      }
    )
  }
  getAllEquipmentsByID(id) {
    this.loaders.equipmentLoader = true;
    this.profileService.getEquipmentsById(id)
    .subscribe(
      data => {
        if(data.status) {
          this.loaders.equipmentLoader = false;
          this.equipments = data.result;
        } else if(!data.status) {
          this.loaders.equipmentLoader = false;
          this.equipments = [];
        }
      }
    )
  }

  addNewEquipment() {
    this.submittedEquipment = true;
    if (this.addEquipment.invalid) {
      return;
    } else {
      this.profileService.addNewPilotEquipment(this.addEquipment.value)
      .subscribe(
        data => {
          if(data.status) {
            this.getAllEquipmentsByID('1')
          }
        }
      );
    }
  
  }

  addNewDrone() {
    this.submittedDrone = true;
    if (this.addDrone.invalid) {
      return;
  } else {
    this.profileService.addNewPilotDrone(this.addDrone.value)
    .subscribe(
      data => {
        if(data.status) {
          this.getAllDronesByID('1')
        }
      }
    );
  }
  }

  updateEquipmentByID(){
  
    var data = Object.assign({}, this.addEquipment.value)
    // delete data['UserId'];
    // delete data['PilotId'];
    data.ID = this.selectedEquipment.ID;

    this.profileService.updatePilotEquipment(data)
    .subscribe( data=> {
      if(data.status) {
        this.getAllEquipmentsByID('1');
      }
    })
  }
  updateDroneByID(){
    var data = Object.assign({}, this.addDrone.value)
    // delete data['UserId'];
    // delete data['PilotId'];
    data.ID = this.selectedDrone.ID;

    this.profileService.updatePilotDrone(data)
    .subscribe( data=> {
      if(data.status) {
        this.getAllDronesByID('1');
      }
    })
  }


}
