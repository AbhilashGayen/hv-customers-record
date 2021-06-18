import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers-filter',
  templateUrl: 'customers-filter.component.html',
})
export class CustomersFilterComponent implements OnInit {
  @Input() formGroup: FormGroup;

  readonly priority = Priority;

  static emptyModel: CustomersFilterModel = {
    name: '',
    location: '',
    phone: '',
    contactPerson: '',
    internalComment: '',
    internalRepresentative: '',
    isMailSent: false,
    priority: 0,
  };

  static createFormGroup(formBuilder: FormBuilder) {
    const formGroup = formBuilder.group({
      name: '',
      location: '',
      phone: '',
      contactPerson: '',
      internalComment: '',
      internalRepresentative: '',
      isMailSent: false,
      priority: 0,
    });
    return formGroup;
  }

  ngOnInit(): void {
    const emptyModel = CustomersFilterComponent.emptyModel;
  }
}

export interface CustomersFilterModel {
  name: string;
  priority: Priority;
  location: string;
  phone: string;
  contactPerson: string;
  internalComment: string;
  internalRepresentative: string;
  isMailSent: boolean;
}

export enum Priority {
  Undefined = 0,
  Immediate = 1,
  NotImmediate = 2,
  NotInterested = 3,
  NoResponse = 4,
}
