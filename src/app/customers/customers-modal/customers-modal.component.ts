import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-modal',
  templateUrl: 'customers-modal.component.html',
})
export class CustomersModalComponent implements OnInit {
  formGroup: FormGroup;
  customer: Customer;

  constructor(
    private svc: CustomersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CustomersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.customer = data?.customer || ({} as Customer);
  }

  get emailsArrayControl() {
    return (this.formGroup.get('email') as FormArray).controls;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      customerId: this.customer.customerId || '',
      name: this.customer.name,
      location: this.customer.location,
      email: this.formBuilder.array([this.customer.email]),
      phone: this.customer.phone,
      contactPerson: this.customer.contactPerson,
      contactRole: this.customer.contactRole,
      internalComment: this.customer.internalComment,
      internalRepresentative: this.customer.internalRepresentative,
      priority: this.customer.priority,
      isMailSent: this.customer.isMailSent,
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.svc.addCustomer(this.formGroup.value);
    this.dialogRef.close(this.formGroup.value);
  }

  edit() {
    this.svc.updateCustomer(this.formGroup.value);
    this.dialogRef.close(this.formGroup.value);
  }

  delete() {
    const id = this.formGroup.value.customerId;
    this.svc.deletePost(id);
    this.dialogRef.close();
  }
}

interface CustomerDialogueFormModel {
  customerId: string;
  name: string;
  location: string;
  email: string[];
  phone: string;
  contactPerson: string;
  contactRole: string;
  internalComment: string;
  internalRepresentative: string;
  priority: number;
  isMailSent: boolean;
}
