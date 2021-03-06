import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import {
  CustomerSorterValueName,
  CustomersSorterService,
} from '../customer-sorter.service';
import { Customer } from '../customer.model';
import { CustomersFilterComponent } from '../customers-filter/customers-filter.component';
import { CustomersModalComponent } from '../customers-modal/customers-modal.component';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  providers: [CustomersSorterService],
})
export class CustomersListComponent implements OnInit {
  formGroup: FormGroup;
  customersData: Customer[];
  events: string[] = [];
  panelOpenState = false;

  readonly action = DialogAction;

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private svc: CustomersService,
    private authSvc: AuthService,
    private sorter: CustomersSorterService
  ) {
    this.formGroup = CustomersFilterComponent.createFormGroup(this.formBuilder);
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.svc.getCustomers().subscribe((response) => {
      this.customersData = this.sorter.sort(response as Customer[]);
    });
  }

  sortBy(value: CustomerSorterValueName) {
    this.customersData = this.sorter.sortBy(this.customersData, value);
  }

  openDialog(action: DialogAction, customer: Customer = {}) {
    const readOnly = action === DialogAction.edit ? true : false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70vw';
    dialogConfig.minHeight = '70vh';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.panelClass = 'unselectable';

    if (customer) {
      dialogConfig.data = {
        customer: {
          _id: customer._id,
          name: customer.name,
          vendorCode: customer.vendorCode,
          location: customer.location,
          email: customer.email,
          phone: customer.phone,
          contactPerson: customer.contactPerson,
          contactRole: customer.contactRole,
          internalComment: customer.internalComment,
          priority: customer.priority,
          isMailSent: customer.isMailSent,
          internalRepresentative: customer.internalRepresentative,
          lastEdit: customer.lastEdit,
        },
        readOnly: readOnly,
      };
    }

    const dialogRef = this.matDialog.open(
      CustomersModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      this.svc.getCustomers().subscribe((response) => {
        this.customersData = this.sorter.sort(response as Customer[]);
      });
    });
  }

  onLogout() {
    this.authSvc.logout();
  }
}

export enum DialogAction {
  new = 'new',
  edit = 'edit',
}
