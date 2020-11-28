import { RouterModule, Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { OwnerComponent } from './components/owner/owner.component';
import { OwnerVehicleComponent } from './components/owner-vehicle/owner-vehicle.component';
import { DriverComponent } from './components/driver/driver.component';
import { DriverVehicleComponent } from './components/driver-vehicle/driver-vehicle.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleQueryComponent } from './components/vehicle-query/vehicle-query.component';
import { ReportComponent } from './components/report/report.component';


const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'owner', component: OwnerComponent},
    {path: 'ownerVehicle', component: OwnerVehicleComponent},
    {path: 'driver', component: DriverComponent},
    {path: 'driverVehicle', component: DriverVehicleComponent},
    {path: 'vehicle', component: VehicleComponent},
    {path: 'vehicleQuery', component: VehicleQueryComponent},
    {path: 'report', component: ReportComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);