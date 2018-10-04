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
    CommandCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    HighchartsChartModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
