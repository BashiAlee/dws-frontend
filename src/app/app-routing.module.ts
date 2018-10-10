import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileModule } from './pages/profile/profile.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { BlankLayoutComponent } from './components/layout/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

import { CommandCenterComponent } from './pages/admin/command-center/command-center.component';
import { PilotListComponent } from './pages/admin/pilot-list/pilot-list.component';

const routes: Routes = [
  { 
    path: '', 
    
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', redirectTo:'profile/:id', pathMatch:'full' },
      {path:'profile/:id' ,component: ProfileComponent, loadChildren: ()=>ProfileModule},
    ]
},
{ 
  path: 'admin', 
  
  component: MainLayoutComponent,
  children: [
    { path: 'command-center', component: CommandCenterComponent },
    { path: 'pilot-list', component: PilotListComponent }
  ]
},

  { 
    path: '', 
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
