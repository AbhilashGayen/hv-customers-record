import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers-filter',
  templateUrl: 'customers-filter.component.html',
})
export class CustomersFilterComponent implements OnInit {
  @Input() formGroup: FormGroup;

  static emptyModel: CustomersFilterModel = {
    name: '',
    location: '',
    phone: '',
    contactPerson: '',
    internalComment: '',
    internalRepresentative: '',
    isMailSent: false,
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
    });
    return formGroup;
  }

  ngOnInit(): void {
    const emptyModel = CustomersFilterComponent.emptyModel;
  }
}

export interface CustomersFilterModel {
  name: string;
  location: string;
  phone: string;
  contactPerson: string;
  internalComment: string;
  internalRepresentative: string;
  isMailSent: boolean;
}
