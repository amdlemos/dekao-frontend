import { CustomersService } from '../../customers.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/_models/customer.model';






@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subscription', 'email', 'code'];
  public dataSource: Customer[];

  

  constructor(private _customersService: CustomersService) { }

  ngOnInit(): void {    
    this.getCustomers();
  }

  async getCustomers() {
    this.dataSource = await this._customersService.getAll();
  }

}
