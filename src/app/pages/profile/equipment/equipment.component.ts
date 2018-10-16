import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsComponent } from '../../../components/modals/modals.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  drones: any;
  bsModalRef: BsModalRef;
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
  Notes: any;
  isAdmin: any;
  id: any;
  loading: any;
  config = {
    class: "custom-modal modal-dialog-centered modal-md"
  };

  selectedData: any;
  constructor(private profileService: ProfileService, private formBuilder: FormBuilder,
    private route: ActivatedRoute,private router: Router,
    private modalService: BsModalService,
    private authService: AuthenticationService) {
      this.route.parent.url.subscribe((urlPath) => {
        this.id = parseInt(urlPath[1].path);
      })
    
    this.addDrone = this.formBuilder.group({
      UserId: [this.id],
      PilotId: [],
      DroneTitle: ['',Validators.required],
      Description:['',Validators.required],
      SerialNumber: ['',Validators.required]
    })
    this.addEquipment = this.formBuilder.group({
      UserId: [this.id],
      PilotId: [],
      EquipmentTitle: ['',Validators.required],
      Description: ['',Validators.required]
    })


    this.loaders = {};
    this.getAllDronesByID(this.id);
    this.getAllEquipmentsByID(this.id);
    if(this.router.url.split('/')[1] =='admin') {
      this.isAdmin = true;
    }
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
          this.Notes = this.equipments[0].Notes;
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
            this.submittedEquipment = false;
            // this.addEquipment.reset()
            this.addEquipment.patchValue({
              EquipmentTitle:'',
              Description: ''
            })
            this.getAllEquipmentsByID(this.id)
          }
        }
      );
    }
  
  }

  addNewDrone() {
    console.log("hereee")
    this.submittedDrone = true;
    if (this.addDrone.invalid) {

      return;
  } else {
    this.profileService.addNewPilotDrone(this.addDrone.value)
    .subscribe(
      data => {
        if(data.status) {
          this.addDrone.patchValue({
            DroneTitle: '',
            Description:'',
            SerialNumber: ''
          })
          this.submittedDrone = false;
          this.getAllDronesByID(this.id)
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
        this.getAllEquipmentsByID(this.id);
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
        this.getAllDronesByID(this.id);
      }
    })
  }

  updateEquipmentNotes(){
    this.loaders = true;
    var data = {
      UserId: this.id,
      Notes: this.Notes
    }

    this.profileService.updateEquipmentNotes(data)
    .subscribe(
      data => {
        if(data.status) {
          const initialState = {
            type: 'success',
            page: 'experience-portfolio',
            id: this.id
          }
          this.loaders = false;
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        } else if(!data.status) {
          const initialState = {
            type: 'error'
          }
          this.loaders = false;
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        }
      }
    )


  }
  openModalWithClass(template: TemplateRef<any>, type,id) {
    var initialState = {
      type: type,
      id: id
    }
    var config  = {
      class: 'custom-modal modal-dialog-centered modal-lg'
    }
    this.selectedData = initialState;
    this.bsModalRef = this.modalService.show(template, Object.assign({}, config))

  }

  deleteByID() {
    console.log("test",this.id)
    if(this.selectedData.type=='drone') {
      this.profileService.deleteDroneById(this.selectedData.id)
      .subscribe(data => {
        if(data.status) {
          this.getAllDronesByID(this.id)
          this.bsModalRef.hide();
        }
      })
    }

    if(this.selectedData.type=='equipment') {
      this.profileService.deleteEquipmentById(this.selectedData.id)
      .subscribe(data => {
        if(data.status) {
          this.getAllEquipmentsByID(this.id);
          this.bsModalRef.hide();
        }
      })
    }
  }

  


}
