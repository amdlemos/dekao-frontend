import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Customer } from 'src/app/_models/customer.model';


@Injectable()
export class CustomersService {

    constructor(private http: HttpClient) {

    }

    findCourseById(customersId: number): Observable<Customer> {
        return this.http.get<Customer>(`/customers/${customersId}`);
    }

    findAllCourses(): Observable<Customer[]> {
        return this.http.get('/customers')
            .pipe(
                map(res => res['payload'])
            );
    }

    findAllCourseLessons(customersId: number): Observable<Customer[]> {
        return this.http.get('/customers', {
            params: new HttpParams()
                .set('courseId', customersId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res => res["payload"])
        );
    }

    findLessons(
        courseId: number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3): Observable<Customer[]> {

        return this.http.get('/customers', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res => res["payload"])
        );
    }

}