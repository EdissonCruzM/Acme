import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Driver } from '../../models/driver';
import { DriverService } from '../../services/driver.service';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  providers: [DriverService]
})
export class DriverComponent implements OnInit {

  driverForm: FormGroup;
  public driver: Driver;
  public status: string;

  constructor(private fb: FormBuilder, private _driverService: DriverService) { 
    this.createDriverForm();
  }

  ngOnInit(): void {
  }

  get idInvalid(){
    return this.driverForm.get('id').invalid && this.driverForm.get('id').touched
  }
  get firstNameInvalid(){
    return this.driverForm.get('firstName').invalid && this.driverForm.get('firstName').touched
  }
  get secondNameInvalid(){
    return this.driverForm.get('secondName').invalid && this.driverForm.get('secondName').touched
  }
  get surnamesInvalid(){
    return this.driverForm.get('surnames').invalid && this.driverForm.get('surnames').touched
  }
  get addressInvalid(){
    return this.driverForm.get('address').invalid && this.driverForm.get('address').touched
  }
  get phoneInvalid(){
    return this.driverForm.get('phone').invalid && this.driverForm.get('phone').touched
  }
  get cityInvalid(){
    return this.driverForm.get('city').invalid && this.driverForm.get('city').touched
  }

  createDriverForm(){
    this.driverForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('[a-z0-9.]{1,}')]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,}')]],
      secondName: ['', Validators.pattern('[a-zA-Z]{1,}')],
      surnames: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{1,}')]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z .]{1,}')]]
    });
  }

  create(){
    if(this.driverForm.invalid){
      // Formulario incorrecto
      return Object.values(this.driverForm.controls).forEach(control => {
        control .markAsTouched();
      });
    }else{
      // Registrar conductor
      this.driver = new Driver(this.driverForm.value.id,
                             this.driverForm.value.firstName,
                             this.driverForm.value.surnames,
                             this.driverForm.value.address,
                             this.driverForm.value.phone,
                             this.driverForm.value.city,
                             this.driverForm.value.secondName);
       
      this._driverService.register(this.driver).subscribe(
        (response)=>{
          this.status = 'success';
          this.driverForm.reset();
        },
        (error)=>{
          this.status = 'error';
        }
      );
    } 
  }
}
