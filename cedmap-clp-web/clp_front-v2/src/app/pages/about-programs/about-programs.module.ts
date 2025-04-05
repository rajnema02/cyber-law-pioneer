import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutProgramsRoutingModule } from './about-programs-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AboutProgramsRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class AboutProgramsModule { }
