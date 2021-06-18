import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TextInputsComponent } from './text-inputs/text-inputs.component';
import { CustomersComponentFilterPipe } from './customers-filter/customer-filter.pipe';
import { CustomersFilterComponent } from './customers-filter/customers-filter.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersModalComponent } from './customers-modal/customers-modal.component';
import { ExcelImportComponent } from '../excel-import/excel-import.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BlockCopyPasteDirective } from '../directives/block-copy-paste.directive';

@NgModule({
  declarations: [
    CustomersFilterComponent,
    CustomersListComponent,
    CustomersModalComponent,
    CustomersFilterComponent,
    CustomersComponentFilterPipe,
    TextInputsComponent,
    ExcelImportComponent,
    BlockCopyPasteDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  entryComponents: [CustomersModalComponent],
})
export class CustomersModule {}
