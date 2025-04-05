import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddmoduleComponent } from './addmodule/addmodule.component';
import { ModulelistComponent } from './modulelist/modulelist.component';
import { ModuleupdateComponent } from './moduleupdate/moduleupdate.component';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    AddmoduleComponent,
    ModulelistComponent,
    ModuleupdateComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
