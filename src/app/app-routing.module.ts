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
import { AuthGuard } from './components/auth/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { EmptyLayoutComponent } from './components/layout/empty-layout/empty-layout.component';
import { AdminAuthGuard } from './components/admin-auth/admin-auth.guard';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

const routes: Routes = [
  { 
    path: '', 
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'logincustomer',pathMatch:'full' },
      { path: 'logincustomer', component: LoginComponent },
      { path: 'loginpilot', component: LoginComponent },
      { path: 'signupcustomer', component: SignupComponent },
      { path: 'signuppilot', component: SignupComponent }
    ]
},
  { 
    
    path: 'user', 
    
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', redirectTo:'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
      { path: 'profile', redirectTo:'profile/:id', pathMatch:'full',canActivate: [AuthGuard] },
      {path:'profile/:id' ,component: ProfileComponent, loadChildren: ()=>ProfileModule,canActivate: [AuthGuard]},
    ]
},
{ 
  path: 'admin', 
  
  component: MainLayoutComponent,
  children: [
    { path: 'command-center', component: CommandCenterComponent ,canActivate: [AdminAuthGuard]},
    { path: 'pilot-list', component: PilotListComponent ,canActivate: [AdminAuthGuard]},
    { path: 'profile', redirectTo:'profile/:id', pathMatch:'full',canActivate: [AdminAuthGuard] },
    {path:'profile/:id' ,component: ProfileComponent, loadChildren: ()=>ProfileModule,canActivate: [AdminAuthGuard]},
   
  ]
},

{
  path: 'panel', 
  
  component: EmptyLayoutComponent,
  children: [
    { path: 'admin', component: AdminLoginComponent},
   
  ]

},
{ 
  path: 'email-verification', 
  
  component: VerificationComponent,

},
{ 
  path: 'send-email', 
  
  component: SendEmailComponent,

},
{ 
  path: 'forget-password', 
  
  component: ForgetPasswordComponent,

},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
