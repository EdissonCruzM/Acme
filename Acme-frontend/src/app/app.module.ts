import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Rutas
import { app_routing } from './app.routes';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { OwnerComponent } from './components/owner/owner.component';
import { OwnerVehicleComponent } from './components/owner-vehicle/owner-vehicle.component';
import { DriverComponent } from './components/driver/driver.component';
import { DriverVehicleComponent } from './components/driver-vehicle/driver-vehicle.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { ReportComponent } from './components/report/report.component';
import { VehicleQueryComponent } from './components/vehicle-query/vehicle-query.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OwnerComponent,
    OwnerVehicleComponent,
    DriverComponent,
    DriverVehicleComponent,
    VehicleComponent,
    ReportComponent,
    VehicleQueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    app_routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
