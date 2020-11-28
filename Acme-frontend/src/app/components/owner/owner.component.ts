import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Owner } from '../../models/owner';
import { OwnerService } from '../../services/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  providers: [OwnerService]
})
export class OwnerComponent implements OnInit {

  ownerForm: FormGroup;
  public owner: Owner;
  public status: string;


  constructor(private fb: FormBuilder, private _ownerService: OwnerService) { 
    this.createOwnerForm();
  }

  ngOnInit(): void {
  }

  get idInvalid(){
    return this.ownerForm.get('id').invalid && this.ownerForm.get('id').touched
  }
  get firstNameInvalid(){
    return this.ownerForm.get('firstName').invalid && this.ownerForm.get('firstName').touched
  }
  get secondNameInvalid(){
    return this.ownerForm.get('secondName').invalid && this.ownerForm.get('secondName').touched
  }
  get surnamesInvalid(){
    return this.ownerForm.get('surnames').invalid && this.ownerForm.get('surnames').touched
  }
  get addressInvalid(){
    return this.ownerForm.get('address').invalid && this.ownerForm.get('address').touched
  }
  get phoneInvalid(){
    return this.ownerForm.get('phone').invalid && this.ownerForm.get('phone').touched
  }
  get cityInvalid(){
    return this.ownerForm.get('city').invalid && this.ownerForm.get('city').touched
  }
  

  createOwnerForm(){
    this.ownerForm = this.fb.group({
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
    if(this.ownerForm.invalid){
      // Formulario incorrecto
      return Object.values(this.ownerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      // Registrar propietario
      this.owner = new Owner(this.ownerForm.value.id,
                             this.ownerForm.value.firstName,
                             this.ownerForm.value.surnames,
                             this.ownerForm.value.address,
                             this.ownerForm.value.phone,
                             this.ownerForm.value.city,
                             this.ownerForm.value.secondName);
       
      this._ownerService.register(this.owner).subscribe(
        (response)=>{
          this.status = 'success';
          this.ownerForm.reset();
        },
        (error)=>{
          this.status = 'error';
        }
      );
    } 
  }
}
