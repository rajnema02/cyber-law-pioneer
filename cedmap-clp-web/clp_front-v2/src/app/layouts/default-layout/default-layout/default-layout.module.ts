import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutRoutingModule } from './default-layout-routing.module';
import { DefaultLayoutComponent } from './default-layout.component';
import { ExamModule } from 'src/app/pages/exam/exam.module';
import { InstructionPageComponent } from './instructions/instruction-page/instruction-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
// import { ExtractYoutubeIdPipe } from 'src/app/pages/landing-partner-project/extract-youtube-id.pipe';


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
