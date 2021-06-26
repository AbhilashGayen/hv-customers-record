import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextInputsComponent } from '../text-inputs/text-inputs.component';
import { Customer } from '../customer.model';
import { CustomersService } from '../customers.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-customers-modal',
  templateUrl: 'customers-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomersModalComponent implements OnInit {
  formGroup: FormGroup;
  customer: Customer;
  deleteConfirmation: boolean = false;
  readOnly: any;
  username: any;

  constructor(
    private svc: CustomersService,
    private authSvc: AuthService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CustomersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.customer = data?.customer || {};
    this.readOnly = data?.readOnly || false;
  }

  ngOnInit(): void {
    this.authSvc.getUserDetails().subscribe((r) => {
      this.username = r.username;
    });

    this.formGroup = this.formBuilder.group({
      customerId: this.customer._id,
      name: [this.customer.name, Validators.required],
      vendorCode: this.customer.vendorCode,
      location: this.customer.location,
      email: TextInputsComponent.createFormArray(
        this.formBuilder,
        this.customer.email
      ),
      phone: TextInputsComponent.createFormArray(
        this.formBuilder,
        this.customer.phone
      ),
      contactPerson: TextInputsComponent.createFormArray(
        this.formBuilder,
        this.customer.contactPerson
      ),
      contactRole: this.customer.contactRole,
      internalComment: this.customer.internalComment,
      internalRepresentative: this.customer.internalRepresentative,
      priority: this.customer.priority,
      isMailSent: this.customer.isMailSent,
      editedBy: this.customer.lastEdit?.by,
      editedTime: this.customer.lastEdit?.time,
    });
  }

  enableForm() {
    this.readOnly = false;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.formGroup.valid) return;

    const value: CustomerDialogueFormModel = this.formGroup.value;
    const customer = CustomersModalComponent.toCustomer(value, this.username!);
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
    if (!this.formGroup.valid) return;

    const value = this.formGroup.value;
    const customer = CustomersModalComponent.toCustomer(value, this.username!);
    this.svc.updateCustomer(customer._id!, customer).subscribe(
      (res) => {
        console.log('Content updated successfully!');
        this.dialogRef.close(this.formGroup.value);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(value: boolean) {
    this.deleteConfirmation = value;
  }

  confirmDelete() {
    const id = this.formGroup.value.customerId;
    this.svc.deleteCustomer(id).subscribe(() => {
      this.dialogRef.close();
    });
  }

  addEmptyField(formArray: any) {
    TextInputsComponent.addEmptyRow(this.formBuilder, formArray as FormArray);
  }

  static toCustomer(
    value: CustomerDialogueFormModel,
    username: string = ''
  ): Customer {
    return {
      _id: value.customerId,
      vendorCode: value.vendorCode,
      name: value.name,
      location: value.location,
      email: TextInputsComponent.save(value.email),
      phone: TextInputsComponent.save(value.phone),
      contactPerson: TextInputsComponent.save(value.contactPerson),
      contactRole: value.contactRole,
      internalComment: value.internalComment,
      internalRepresentative: value.internalRepresentative,
      priority: value.priority,
      isMailSent: value.isMailSent,
      lastEdit: {
        by: username,
        time: new Date().toISOString(),
      },
    };
  }
}

interface CustomerDialogueFormModel {
  customerId: string;
  name: string;
  vendorCode: string;
  location: string;
  email: string[];
  phone: string;
  contactPerson: string[];
  contactRole: string;
  internalComment: string;
  internalRepresentative: string;
  priority: number;
  isMailSent: boolean;
}
