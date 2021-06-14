import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextInputsComponent } from '../text-inputs/text-inputs.component';
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
    this.customer = data?.customer || {};
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      customerId: this.customer._id,
      name: this.customer.name,
      location: this.customer.location,
      email: TextInputsComponent.createFormArray(
        this.formBuilder,
        this.customer.email
      ),
      phone: TextInputsComponent.createFormArray(
        this.formBuilder,
        this.customer.phone
      ),
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
    const value: CustomerDialogueFormModel = this.formGroup.value;
    const customer = CustomersModalComponent.toCustomer(value);
    this.svc.createCustomer(customer).subscribe(
      (res) => {
        console.log('Customer successfully created!');
        this.dialogRef.close(this.formGroup.value);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit() {
    const value = this.formGroup.value;
    const customer = CustomersModalComponent.toCustomer(value);
    this.svc.updateCustomer(customer._id, customer).subscribe(
      (res) => {
        console.log('Content updated successfully!');
        this.dialogRef.close(this.formGroup.value);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete() {
    const id = this.formGroup.value.customerId;
    this.svc.deleteCustomer(id).subscribe(() => {
      this.dialogRef.close();
    });
  }

  addEmptyField(formArray: any) {
    TextInputsComponent.addEmptyRow(this.formBuilder, formArray as FormArray);
  }

  static toCustomer(value: CustomerDialogueFormModel) {
    return {
      _id: value.customerId,
      name: value.name,
      location: value.location,
      email: TextInputsComponent.save(value.email),
      phone: TextInputsComponent.save(value.phone),
      contactPerson: value.contactPerson,
      contactRole: value.contactRole,
      internalComment: value.internalComment,
      internalRepresentative: value.internalRepresentative,
      priority: value.priority,
      isMailSent: value.isMailSent,
    };
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
