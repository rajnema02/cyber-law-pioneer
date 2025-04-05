import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchManagementRoutingModule } from './batch-management-routing.module';
import { BatchCreateComponent } from './batch-create/batch-create.component';
import { BatchListComponent } from './batch-list/batch-list.component';
import { BatchAllotmentComponent } from './batch-allotment/batch-allotment.component';
import { FormsModule } from '@angular/forms';
import { StudentAllotedComponent } from './student-alloted/student-alloted.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { BatchUpdateComponent } from './batch-update/batch-update.component';
import { BatchDownloadComponent } from './batch-download/batch-download.component';
import { BatchAddressComponent } from './batch-address/batch-address.component';


@NgModule({
  declarations: [
    BatchCreateComponent,
    BatchListComponent,
    BatchAllotmentComponent,
    StudentAllotedComponent,
    BatchUpdateComponent,
    BatchDownloadComponent,
    BatchAddressComponent
  ],
  imports: [
    CommonModule,
    BatchManagementRoutingModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class BatchManagementModule { }
