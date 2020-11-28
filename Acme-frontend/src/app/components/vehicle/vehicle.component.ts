import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  providers: [VehicleService]
})
export class VehicleComponent implements OnInit {

  vehicleForm: FormGroup;
  public vehicle: Vehicle;
  public errors;
  public status: string;

  constructor(private fb: FormBuilder, private _vehicleService: VehicleService) {
    this.createVehicleForm();
  }

  ngOnInit(): void {
  }

  get plateInvalid(){
    return this.vehicleForm.get('carPlate').invalid && this.vehicleForm.get('carPlate').touched
  }
  get ownerIdInvalid(){
    return this.vehicleForm.get('ownerId').invalid && this.vehicleForm.get('ownerId').touched
  }
  get driverIdInvalid(){
    return this.vehicleForm.get('driverId').invalid && this.vehicleForm.get('driverId').touched
  }
  get colourInvalid(){
    return this.vehicleForm.get('colour').invalid && this.vehicleForm.get('colour').touched
  }
  get tradeMarkInvalid(){
    return this.vehicleForm.get('tradeMark').invalid && this.vehicleForm.get('tradeMark').touched
  }
  get typeInvalid(){
    return this.vehicleForm.get('type').invalid && this.vehicleForm.get('type').touched
  }

  createVehicleForm(){
    this.vehicleForm = this.fb.group({
      carPlate: ['', [Validators.required, Validators.pattern('[A-Z0-9-]{4,}')]],
      ownerId: ['', [Validators.required, Validators.pattern('[a-z0-9.]{1,}')]],
      driverId: ['', [Validators.required, Validators.pattern('[a-z0-9.]{1,}')]],
      colour: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{1,}')]],
      tradeMark: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{1,}')]],
      type: ['', [Validators.required]]
    });
  }

  create(){
    if(this.vehicleForm.invalid){
      // Formulario incorrecto
      return Object.values(this.vehicleForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      // registrar vehiculo

      this.vehicle = new Vehicle(this.vehicleForm.value.carPlate,
                                 this.vehicleForm.value.ownerId,
                                 this.vehicleForm.value.driverId,
                                 this.vehicleForm.value.colour,
                                 this.vehicleForm.value.tradeMark,
                                 this.vehicleForm.value.type);

      this._vehicleService.register(this.vehicle).subscribe(
        (response)=>{
          this.status = 'success';
          this.vehicleForm.reset();
        },
        (error)=>{
          this.status = 'error';
          this.errors = error.error.errors;
        }
      );
    }
  }
}
