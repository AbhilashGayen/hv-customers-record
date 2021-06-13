import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient) {}

  getCustomers() {
    this.http
      .get<{ message: string; customers: any[] }>(
        'http://localhost:3000/api/customers'
      )
      .pipe(
        map((customerData) => {
          return customerData.customers.map((customer) => {
            return {
              customerId: customer._id,
              name: customer.name,
              location: customer.location,
              phone: customer.phone,
              contactPerson: customer.contactPerson,
              contactRole: customer.contactRole,
              internalComment: customer.internalComment,
              internalRepresentative: customer.internalRepresentative,
              priority: customer.priority,
              isMailSent: customer.isMailSent,
            };
          });
        })
      )
      .subscribe((transformedCustomers) => {
        this.customers = transformedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getCusotmerUpdateListner() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(customer: Customer) {
    this.http
      .post<{ message: string; customerId: string }>(
        'http://localhost:3000/api/customers',
        customer
      )
      .subscribe((response) => {
        const customerId = response.customerId;
        customer.customerId = customerId;
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
      });
  }

  updateCustomer(customer: Customer) {
    this.http
      .put<{ message: string; customer: any }>(
        'http://localhost:3000/api/customers/' + customer.customerId,
        customer
      )
      .subscribe((response) => {
        this.customersUpdated.next([...this.customers]);
      });
  }

  deletePost(customerId: string) {
    this.http
      .delete('http://localhost:3000/api/customers/' + customerId)
      .subscribe(() => {
        const updatedCustomers = this.customers.filter(
          (customer) => customer.customerId !== customerId
        );
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }
}
