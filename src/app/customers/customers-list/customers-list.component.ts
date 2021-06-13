import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../customer.model';
import { CustomersFilterComponent } from '../customers-filter/customers-filter.component';
import { CustomersModalComponent } from '../customers-modal/customers-modal.component';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  formGroup: FormGroup;
  customersData: Customer[];

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private svc: CustomersService
  ) {
    this.formGroup = CustomersFilterComponent.createFormGroup(this.formBuilder);
  }

  get customers() {
    return;
  }
  ngOnInit() {
    this.svc.getCustomers().subscribe((response) => {
      this.customersData = response as Customer[];
    });
  }

  openDialog(customer: Customer = {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (customer) {
      dialogConfig.data = {
        customer: {
          _id: customer._id,
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

    dialogRef.afterClosed().subscribe((data) => {
      this.svc.getCustomers().subscribe((response) => {
        this.customersData = response as Customer[];
      });
    });
  }
}
