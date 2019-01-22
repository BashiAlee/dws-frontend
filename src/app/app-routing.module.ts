import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ProfileComponent
} from './pages/profile/profile.component';
import {
  ProfileModule
} from './pages/profile/profile.module';
import {
  DashboardComponent
} from './pages/dashboard/dashboard.component';
import {
  LoginComponent
} from './pages/login/login.component';
import {
  BlankLayoutComponent
} from './components/layout/blank-layout/blank-layout.component';
import {
  MainLayoutComponent
} from './components/layout/main-layout/main-layout.component';

import {
  CommandCenterComponent
} from './pages/admin/command-center/command-center.component';
import {
  PilotListComponent
} from './pages/admin/pilot-list/pilot-list.component';
import {
  AuthGuard
} from './components/auth/auth.guard';
import {
  SignupComponent
} from './pages/signup/signup.component';
import {
  VerificationComponent
} from './pages/verification/verification.component';
import {
  AdminLoginComponent
} from './pages/admin/admin-login/admin-login.component';
import {
  EmptyLayoutComponent
} from './components/layout/empty-layout/empty-layout.component';
import {
  AdminAuthGuard
} from './components/admin-auth/admin-auth.guard';
import {
  SendEmailComponent
} from './pages/send-email/send-email.component';
import {
  ForgetPasswordComponent
} from './pages/forget-password/forget-password.component';
import {
  CommunicationComponent
} from './pages/admin/communication/communication.component';
import {
  JobsComponent
} from './pages/admin/jobs/jobs.component';
import {
  JobCalenderComponent
} from "./pages/job-calender/job-calender.component";
import { ClientJobComponent } from "./pages/jobs/client-job/client-job.component";
import { PilotJobListComponent } from "./pages/jobs/pilot-job-list/pilot-job-list.component";
import { ClientJobListComponent } from "./pages/jobs/client-job-list/client-job-list.component";
const routes: Routes = [
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "loginpilot",
        pathMatch: "full"
      },
      {
        path: "logincustomer",
        component: LoginComponent
      },
      {
        path: "loginpilot",
        component: LoginComponent
      },
      {
        path: "signupcustomer",
        component: SignupComponent
      },
      {
        path: "signuppilot",
        component: SignupComponent
      }
    ]
  },
  {
    path: "user",

    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "user",
        redirectTo: "dashboard",
        pathMatch: "full",
        canActivate: [AuthGuard]
      },
      {
        path: "communication",
        component: CommunicationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "profile",
        redirectTo: "profile/:id",
        pathMatch: "full",
        canActivate: [AuthGuard]
      },
      {
        path: "profile/:id",
        component: ProfileComponent,
        loadChildren: () => ProfileModule,
        canActivate: [AuthGuard]
      },
      {
        path: "create-job",
        component: ClientJobComponent,
        pathMatch: "full"
      },
      {
        path: "client-job-list",
        component: ClientJobListComponent,
        pathMatch: "full"
      },
      {
        path: "pilot-job-list",
        component: PilotJobListComponent,
        pathMatch: "full"
      },
      {
        path: "job/:id",
        component: ClientJobComponent,
        pathMatch: "full"
      },
      {
        path: "job-calender",
        component: JobCalenderComponent,
        pathMatch: "full"
      }
    ]
  },
  {
    path: "admin",

    component: MainLayoutComponent,
    children: [
      {
        path: "command-center",
        component: CommandCenterComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "communication",
        component: CommunicationComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "pilot-list",
        component: PilotListComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "pilot-list/:id",
        component: PilotListComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "profile",
        redirectTo: "profile/:id",
        pathMatch: "full",
        canActivate: [AdminAuthGuard]
      },
      {
        path: "profile/:id",
        component: ProfileComponent,
        loadChildren: () => ProfileModule,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "jobs-list",
        component: JobsComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: "job/:id",
        component: ClientJobComponent,
        pathMatch: "full"
      }
    ]
  },

  {
    path: "panel",

    component: EmptyLayoutComponent,
    children: [
      {
        path: "admin",
        component: AdminLoginComponent
      }
    ]
  },
  {
    path: "email-verification",

    component: VerificationComponent
  },
  {
    path: "send-email",

    component: SendEmailComponent
  },
  {
    path: "forget-password",

    component: ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
