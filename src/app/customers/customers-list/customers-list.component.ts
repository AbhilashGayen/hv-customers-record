import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Customer } from '../customer.model';
import { CustomersFilterComponent } from '../customers-filter/customers-filter.component';
import { CustomersModalComponent } from '../customers-modal/customers-modal.component';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  customersData: Customer[];
  private customersSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private svc: CustomersService
  ) {
    this.formGroup = CustomersFilterComponent.createFormGroup(this.formBuilder);
  }

  ngOnInit() {
    this.svc.getCustomers();
    this.customersSub = this.svc
      .getCusotmerUpdateListner()
      .subscribe((customers: Customer[]) => {
        this.customersData = customers;
      });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }

  openDialog(customer: Customer = {}) {
    console.log(customer);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (customer) {
      dialogConfig.data = {
        customer: {
          customerId: customer.customerId,
          name: customer.name,
          location: customer.location,
          email: customer.email,
          phone: customer.phone,
          contactPerson: customer.contactPerson,
          contactRole: customer.contactRole,
          internalComment: customer.internalComment,
          priority: customer.priority,
          isMailSent: customer.isMailSent,
          internalRepresentative: customer.internalRepresentative,
        },
      };
    }

    const dialogRef = this.matDialog.open(
      CustomersModalComponent,
      dialogConfig
    );

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', data));
  }
}
