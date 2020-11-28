import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-query',
  templateUrl: './vehicle-query.component.html',
  providers: [VehicleService]
})
export class VehicleQueryComponent implements OnInit {

  public vehiclesData;

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getvehicles();
  }

  getvehicles(){
    this._vehicleService.getvehicles().subscribe(
      response => {
        this.vehiclesData = response.vehicles;
      },
      error => {
        console.log(error);
      }
    );
  }
}
