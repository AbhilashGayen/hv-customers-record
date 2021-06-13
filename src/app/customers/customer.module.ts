import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CustomersComponentFilterPipe } from './customers-filter/customer-filter.pipe';
import { CustomersFilterComponent } from './customers-filter/customers-filter.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersModalComponent } from './customers-modal/customers-modal.component';

@NgModule({
  declarations: [
    CustomersFilterComponent,
    CustomersListComponent,
    CustomersModalComponent,
    CustomersFilterComponent,
    CustomersComponentFilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  entryComponents: [CustomersModalComponent],
})
export class CustomersModule {}
