import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyMaterialRoutingModule } from './study-material-routing.module';
import { MaterialCreateComponent } from './material-create/material-create.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentStudyListComponent } from './student-study-list/student-study-list.component';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    MaterialCreateComponent,
    MaterialListComponent,
    StudentStudyListComponent
  ],
  imports: [
    CommonModule,
    StudyMaterialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class StudyMaterialModule { }
