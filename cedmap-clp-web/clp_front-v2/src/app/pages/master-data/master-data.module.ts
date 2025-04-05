import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentCreateComponent,
    DepartmentListComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MasterDataModule { }
