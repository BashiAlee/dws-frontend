import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  ProfileRoutingModule
} from './profile-routing.module';
import {
  DocumentDeclarationComponent
} from './document-declaration/document-declaration.component';
import {
  ExperiencePortfolioComponent
} from './experience-portfolio/experience-portfolio.component';
import {
  EquipmentComponent
} from './equipment/equipment.component';
import {
  BusinessInformationComponent
} from './business-information/business-information.component';
import {
  PersonalInformationComponent
} from './personal-information/personal-information.component';
import {
  ProfileComponent
} from './profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  declarations: [
    DocumentDeclarationComponent, 
    ExperiencePortfolioComponent, 
    EquipmentComponent, 
    BusinessInformationComponent,
     PersonalInformationComponent, 
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule {}
