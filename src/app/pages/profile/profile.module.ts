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
import { CroppieModule } from '../../../angular-croppie-module/src/lib/croppie.module';
import { AlertModule } from 'ngx-bootstrap';
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    CroppieModule,
    // ImageCropperModule,
    AlertModule.forRoot()
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
