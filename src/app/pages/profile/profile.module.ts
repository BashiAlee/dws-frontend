import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { DocumentDeclarationComponent } from './document-declaration/document-declaration.component';
import { ExperiencePortfolioComponent } from './experience-portfolio/experience-portfolio.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { BusinessInformationComponent } from './business-information/business-information.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [DocumentDeclarationComponent, ExperiencePortfolioComponent, EquipmentComponent, BusinessInformationComponent, PersonalInformationComponent]
})
export class ProfileModule { }
