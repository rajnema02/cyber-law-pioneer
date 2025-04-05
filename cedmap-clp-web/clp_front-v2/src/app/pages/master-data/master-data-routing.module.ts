import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCreateComponent } from './department/department-create/department-create.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';

const routes: Routes = [
  {
    path:'department-create',
    component:DepartmentCreateComponent
  },
  {
    path:'department-list',
    component:DepartmentListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
