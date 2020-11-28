import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-owner-vehicle',
  templateUrl: './owner-vehicle.component.html',
  providers: [VehicleService]
})
export class OwnerVehicleComponent implements OnInit {

  public vehicleOwnerData;

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getvehicleOwner();
  }

  getvehicleOwner(){
    this._vehicleService.getvehicleOwner().subscribe(
      response => {
        this.vehicleOwnerData = response.ownerVehicle;
      },
      error => {
        console.log(error);
      }
    );
  }

}
