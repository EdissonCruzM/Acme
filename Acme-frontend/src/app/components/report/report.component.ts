import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [VehicleService]
})
export class ReportComponent implements OnInit {

  public reportData;

  constructor(private _vehicleService: VehicleService) { }


  ngOnInit(): void {
    this.getReport();
  }

  getReport(){
    this._vehicleService.getReport().subscribe(
      response => {
        this.reportData = response.report;
      },
      error => {
        console.log(error);
      }
    );
  }
}
