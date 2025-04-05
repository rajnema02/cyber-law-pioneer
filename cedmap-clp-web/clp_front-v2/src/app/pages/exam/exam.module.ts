import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { QuestionComponent } from './question/question.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import {  CKEditorModule } from 'ckeditor4-angular';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { FormsModule } from '@angular/forms';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { StudentExamListComponent } from './student-exam-list/student-exam-list.component';
import { CountDownComponent } from './count-down/count-down.component';
import { InstructionPageComponent } from './instruction-page/instruction-page.component';
import { ResultListComponent } from './result-list/result-list.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReScheduleExamFormComponent } from './re-schedule-exam-form/re-schedule-exam-form.component';
import { CertificateComponent } from './certificate/certificate.component';
import { NgxPaginationModule } from "ngx-pagination";
import { DemoExamComponent } from './demo-exam/demo-exam.component';
import { ExamSubmitComponent } from './exam-submit/exam-submit.component';
import { StudentCertificatesComponent } from './student-certificates/student-certificates.component';
import { ResultPdfComponent } from './result-pdf/result-pdf.component';
import { ExamFormComponent } from './exam-form/exam-form.component';

@NgModule({
  declarations: [
    QuestionComponent,
    BulkUploadComponent,
    ScheduleExamComponent,
    ExamListComponent,
    QuestionBankComponent,
    QuestionPaperComponent,
    StudentExamListComponent,
    CountDownComponent,
    InstructionPageComponent,
    ResultListComponent,
    ReScheduleExamFormComponent,
    CertificateComponent,
    DemoExamComponent,
    ExamSubmitComponent,
    StudentCertificatesComponent,
    ResultPdfComponent,
    ExamFormComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    CKEditorModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class ExamModule { }
