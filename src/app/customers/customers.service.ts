import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from './customer.model';

const BACKEND_URL = environment.apiUrl + '/customers/';
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<Customer[]>(BACKEND_URL);
  }

  getCustomer(id: string) {
    return this.http.get<Customer>(BACKEND_URL + id);
  }

  createCustomer(data: any): Observable<any> {
    let url = BACKEND_URL + 'create';
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  updateCustomer(id: string, data: Customer): Observable<any> {
    let url = BACKEND_URL + 'update/' + id;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  deleteCustomer(id: string): Observable<any> {
    let url = BACKEND_URL + 'delete/' + id;
    return this.http.delete(url).pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
