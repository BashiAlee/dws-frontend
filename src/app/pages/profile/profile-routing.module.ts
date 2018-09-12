import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessInformationComponent } from './business-information/business-information.component';
import { DocumentDeclarationComponent } from './document-declaration/document-declaration.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ExperiencePortfolioComponent } from './experience-portfolio/experience-portfolio.component';

const routes: Routes = [
  { path: '', redirectTo:'personal-information', pathMatch:'full' },
  { path: 'business-information', component: BusinessInformationComponent },
  { path: 'document-declaration', component: DocumentDeclarationComponent },
  { path:'equipment' ,component: EquipmentComponent },
  { path:'personal-information' ,component: PersonalInformationComponent },
  { path:'experience-portfolio' ,component: ExperiencePortfolioComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
