import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileModule } from './pages/profile/profile.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'profile/:id', pathMatch:'full' },
  { path: 'dashboard', component: DashboardComponent },
  {path:'profile/:id' ,component: ProfileComponent, loadChildren: ()=>ProfileModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
