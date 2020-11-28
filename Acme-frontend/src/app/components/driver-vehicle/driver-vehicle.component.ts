import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-driver-vehicle',
  templateUrl: './driver-vehicle.component.html',
  providers: [VehicleService]

})
export class DriverVehicleComponent implements OnInit {

  public vehicleDriverData;


  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getvehicleOwner();
  }

  getvehicleOwner(){
    this._vehicleService.getvehicleDriver().subscribe(
      response => {  
        this.vehicleDriverData = response.dirverVehicle;       
      },
      error => {
        console.log(error);
      }
    );
  }
}
