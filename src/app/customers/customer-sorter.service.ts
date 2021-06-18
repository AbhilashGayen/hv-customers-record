import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import * as _ from 'underscore';

export type CustomerSorterValueName =
  keyof typeof CustomersSorterService.sortByValues;

@Injectable()
export class CustomersSorterService {
  private value: CustomerSorterValue;

  constructor() {
    this.value = this.getDefaultValue();
  }

  sortBy(customers: Customer[], value: CustomerSorterValueName) {
    this.value.ascending =
      this.value.valueName == value ? !this.value.ascending : true;
    this.value.valueName = value;
    return this.sort(customers);
  }

  sort(customers: Customer[]) {
    const sortedCustomers = _.sortBy(customers, this.sortByValue);
    return this.value.ascending ? sortedCustomers : sortedCustomers.reverse();
  }

  private get sortByValue() {
    return CustomersSorterService.sortByValues[this.value.valueName];
  }

  private getDefaultValue() {
    return CustomersSorterService.defaultValue;
  }

  private static readonly defaultValue: CustomerSorterValue = {
    valueName: 'name',
    ascending: true,
  };

  static readonly sortByValues = {
    name: (i: Customer) => i.name || 'xxx',
    location: (i: Customer) => i.location || 'xxx',
    priority: (i: Customer) => [i.priority, i.name].join('_') || 'xxx',
  };
}

interface CustomerSorterValue {
  valueName: CustomerSorterValueName;
  ascending: boolean;
}
