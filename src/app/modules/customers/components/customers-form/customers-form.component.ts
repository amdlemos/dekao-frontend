import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
  form: FormGroup;
  private customerId: string;
  private isNew: boolean = true; 
  private subscription: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private _customerService: CustomersService,
    private route: ActivatedRoute, ) {
    this.form = this.fb.group({
      _id:[null],
      name: [null, Validators.required],
      fantasyName: [null],
      subscription: [null],
      phone: [null],
      email: [null],      
      createdDate: [{value: null, disabled: true}],
      lastUpdate: [{value: null, disabled: true}],
    });

  }

  ngOnInit(): void {    
    this.subscription = this.route.params.subscribe(
      (params: any) => {
       
        this.customerId = params['id'];
        
        if (this.customerId != null) {
          this.isNew = false;
          
          this._customerService.getById(this.customerId).subscribe(data => {            
              this.form.patchValue({
                _id: data._id,
                name: data.name,
                fantasyName: data.fantasyName,
                subscription: data.subscription,
                phone: data.phone,
                email: data.email,
                code: data.code,
                sellerCode: data.sellerCode,
                sellerName: data.sellerName,                
                lastUpdate: moment(data.lastUpdate).locale('pt-br').format('L'),
                createdDate: moment(data.createdDate).locale('pt-br').format('L') ,                
              })              
            });          
        } else {
          this.isNew = true;        
        }
      })
  }

  onSubmit() {
    const customerForm = this.form;
    let result;
    
    if (this.isNew)
      result = this._customerService.add(customerForm.value);
    else
      result = this._customerService.edit(customerForm.value);
  }

}
