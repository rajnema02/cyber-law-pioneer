import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchAllotmentComponent } from './batch-allotment/batch-allotment.component';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchListComponent } from './batch-list/batch-list.component';
import { StudentAllotedComponent } from './student-alloted/student-alloted.component';
import { BatchUpdateComponent } from './batch-update/batch-update.component';
import { BatchDownloadComponent } from './batch-download/batch-download.component';
import { BatchAddressComponent } from './batch-address/batch-address.component';

const routes: Routes = [
  {
    path: 'batch-alloted/:id',
    component: BatchAllotmentComponent
  },
   {
    path: 'view-students/:id',
    component: StudentAllotedComponent
  },
  {
    path: 'batch-create',
    component: BatchCreateComponent
  },
  {
    path: 'batch-update/:id',
    component: BatchUpdateComponent
  },
  {
    path: 'batch-list',
    component: BatchListComponent
  },
  {
    path: 'batch-detail/:id',
    component: BatchDownloadComponent
  },
  {
    path: 'batch-address/:id',
    component: BatchAddressComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchManagementRoutingModule { }
