import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuditProgramRoutingModule } from "./audit-program-routing.module";
import { QuestionCategoryListComponent } from "./question-category-list/question-category-list.component";
import { AuditQuestionAddComponent } from "./audit-question-add/audit-question-add.component";
import { AuditQuestionListComponent } from "./audit-question-list/audit-question-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { CKEditorModule } from "ckeditor4-angular";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuditQuestionnareComponent } from './audit-questionnare/audit-questionnare.component';
import { AuditQuestionnareListComponent } from './audit-questionnare-list/audit-questionnare-list.component';
import { AuditQuestionnareListViewComponent } from './audit-questionnare-list-view/audit-questionnare-list-view.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { StudentExamListComponent } from './student-exam-list/student-exam-list.component';
import { AuditExamComponent } from './audit-exam/audit-exam.component';
import { StudentListComponent } from './student-list/student-list.component';
import { IndividualAnswerSheetComponent } from './individual-answer-sheet/individual-answer-sheet.component';

@NgModule({
  declarations: [
    QuestionCategoryListComponent,
    AuditQuestionAddComponent,
    AuditQuestionListComponent,
    AuditQuestionnareComponent,
    AuditQuestionnareListComponent,
    AuditQuestionnareListViewComponent,
    ExamScheduleComponent,
    ExamListComponent,
    StudentExamListComponent,
    AuditExamComponent,
    StudentListComponent,
    IndividualAnswerSheetComponent,
  ],
  imports: [
    CommonModule,
    AuditProgramRoutingModule,
    CKEditorModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class AuditProgramModule {}
