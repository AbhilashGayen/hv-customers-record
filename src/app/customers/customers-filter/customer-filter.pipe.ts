import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomersFilterModel, Priority } from './customers-filter.component';

@Pipe({
  name: 'customersFilter',
})
export class CustomersComponentFilterPipe implements PipeTransform {
  transform(customers: Customer[], filter: CustomersFilterModel): any[] {
    if (!customers || !filter) {
      return [];
    }
    const customerFilter = new CustomerFilter(filter);
    return customers.filter(customerFilter.filter);
  }
}

class NameFilter {
  static create<T>(filterName: string, getName: (item: T) => string) {
    filterName = filterName && filterName.toLowerCase();
    return (item: T) => {
      return !filterName || getName(item).toLowerCase().includes(filterName);
    };
  }
}

interface FilterFunction<T> {
  (item: T): boolean;
}

abstract class ComplexFilter<T> {
  private filters: FilterFunction<T>[] = [];
  constructor() {}

  add(filter: FilterFunction<T>) {
    if (filter) {
      this.filters.push(filter);
    }
  }

  filter = (item: T) => {
    return this.filters.every((filter) => filter(item));
  };
}

class CustomerFilter extends ComplexFilter<Customer> {
  constructor(filter: CustomersFilterModel) {
    super();
    this.add(CustomerFilter.createNameFilter(filter.name));
    this.add(CustomerFilter.createPriorityFilter(filter));
  }

  static createNameFilter(filterName: string) {
    return NameFilter.create<Customer>(filterName, (customer) => {
      if (!customer.$searchName) {
        customer.$searchName = [
          customer.name,
          customer.phone,
          customer.email,
          customer.contactPerson,
          customer.internalRepresentative,
          customer.location,
          customer.vendorCode
        ].join('--');
      }
      return customer.$searchName;
    });
  }

  static createPriorityFilter(filter: CustomersFilterModel) {
    if (filter.priority == 0) {
      return (customer: Customer) => !!customer;
    }
    return (customer: Customer) => customer.priority == filter.priority;
  }
}
