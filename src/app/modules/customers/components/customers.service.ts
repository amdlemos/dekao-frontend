import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Customer } from 'src/app/_models/customer.model';
import { Router } from '@angular/router';
import { OfflineService } from 'src/app/_services/offline.service';

const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

const API = 'http://localhost:4040/';
@Injectable()
export class CustomersService {



    constructor(
        private readonly offlineService: OfflineService,
        private http: HttpClient,
        private router: Router) {

    }

    async getAll() {
        return await this.http.get<Customer[]>(`${API}customers/`)
            .toPromise()
            .then(customers => {
                return customers;
            });
    }

    getById(customerId): Observable<Customer> {
        return this.http.get<Customer>(`${API}customers/${customerId}`)
    }

    // ---------- add the customers
    add(customer: Customer) {
        //add the "done" property
        //customer["done"] = false;

        // save into the indexedDB if the connection is lost
        if (!this.offlineService.isOnline) {
            console.log('Não é possível adicionar usuários quando se está offline.')
        } else {
            //post request to mongodb
            this.post(customer).subscribe(res => {
                this.router.navigateByUrl('/customers', { skipLocationChange: true }).then(() =>
                    this.router.navigate(["/customers"]));
            });
        }
    }

    edit(customer: Customer) {
        return this.http.put(`${API}customers`, JSON.stringify(customer), { headers: headers }).subscribe()
    }

    // ---------- post an customer from the database
    post(customer: Customer) {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        // let obj = {
        //     name: itemObj["name"],
        //     email: itemObj["email"],
        //     password: itemObj["password"],
        //     done: false
        // }

        console.log("Attempt to add customer:", JSON.stringify(customer.name));
        //post an item
        return this.http.post(`${API}customers`, JSON.stringify(customer), { headers: headers });
    }

}