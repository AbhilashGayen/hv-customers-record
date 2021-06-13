import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersModalComponent } from './customers/customers-modal/customers-modal.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';

const routes: Routes = [
  { path: '', component: CustomersListComponent },
  { path: 'create', component: CustomersModalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
