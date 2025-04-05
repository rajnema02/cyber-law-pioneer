import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutRoutingModule } from './default-layout-routing.module';
import { DefaultLayoutComponent } from './default-layout.component';
import { ExamModule } from 'src/app/pages/exam/exam.module';
import { InstructionPageComponent } from './instructions/instruction-page/instruction-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DefaultLayoutComponent,
    InstructionPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutRoutingModule,
    ExamModule,
    NgbCarouselModule
  ]
})
export class DefaultLayoutModule { }
