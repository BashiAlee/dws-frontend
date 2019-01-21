import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileModule } from './pages/profile/profile.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { BlankLayoutComponent } from './components/layout/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { CommandCenterComponent } from './pages/admin/command-center/command-center.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PilotListComponent } from './pages/admin/pilot-list/pilot-list.component';

import { DataTablesModule } from 'angular-datatables';
import { ModalsComponent } from './components/modals/modals.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './components/auth/auth.guard';
import { BasicHeaderComponent } from './components/basic-header/basic-header.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { EmptyLayoutComponent } from './components/layout/empty-layout/empty-layout.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { PaginationModule } from 'ngx-bootstrap';
import { CommunicationComponent } from './pages/admin/communication/communication.component';
import {MessagesService} from './services/messages/messages.service';
import { SearchPipe } from './components/pipes/search-names/search.pipe';
import { PilotsPipe } from './components/pipes/search-pilots/pilots.pipe';
import { BsDatepickerModule,TimepickerModule } from 'ngx-bootstrap';
import { JobService } from './services/job/job.service';
import { JobsComponent } from './pages/admin/jobs/jobs.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { JobCalenderComponent } from './pages/job-calender/job-calender.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from "ngx-moment";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RatingModule } from "ngx-bootstrap/rating";

import { ClientJobComponent } from './pages/jobs/client-job/client-job.component';
import { PilotJobListComponent } from './pages/jobs/pilot-job-list/pilot-job-list.component';
import { ClientJobListComponent } from './pages/jobs/client-job-list/client-job-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent,
    LoginComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    SidebarAdminComponent,
    CommandCenterComponent,
    PilotListComponent,
    ModalsComponent,
    BasicHeaderComponent,
    SignupComponent,
    HowItWorksComponent,
    VerificationComponent,
    AdminLoginComponent,
    EmptyLayoutComponent,
    SendEmailComponent,
    ForgetPasswordComponent,
    CommunicationComponent,
    SearchPipe,
    PilotsPipe,
    JobsComponent,
    JobCalenderComponent,
    ClientJobComponent,
    PilotJobListComponent,
    ClientJobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    HighchartsChartModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    RatingModule.forRoot(),
    NgbModule,
    MomentModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [ModalsComponent],
  providers: [AuthenticationService, AuthGuard, MessagesService, JobService],
  bootstrap: [AppComponent]
})
export class AppModule {}
