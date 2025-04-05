import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuestionCategoryListComponent } from "./question-category-list/question-category-list.component";
import { AuditQuestionAddComponent } from "./audit-question-add/audit-question-add.component";
import { AuditQuestionListComponent } from "./audit-question-list/audit-question-list.component";
import { AuditQuestionnareComponent } from "./audit-questionnare/audit-questionnare.component";
import { AuditQuestionnareListComponent } from "./audit-questionnare-list/audit-questionnare-list.component";
import { AuditQuestionnareListViewComponent } from "./audit-questionnare-list-view/audit-questionnare-list-view.component";
import { ExamScheduleComponent } from "./exam-schedule/exam-schedule.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { StudentExamListComponent } from "./student-exam-list/student-exam-list.component";
import { AuditExamComponent } from "./audit-exam/audit-exam.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { IndividualAnswerSheetComponent } from "./individual-answer-sheet/individual-answer-sheet.component";

const routes: Routes = [
  { path: "questoin-category", component: QuestionCategoryListComponent },
  { path: "audit-question-add", component: AuditQuestionAddComponent },
  { path: "audit-question-list", component: AuditQuestionListComponent },
  { path: "audit-queryDetail/:id", component: AuditQuestionnareComponent },
  { path: "audit-questionnare", component: AuditQuestionnareComponent },
  { path: "individual-query-list/:id", component: AuditQuestionnareListComponent },
  { path: "audit-query-list", component: AuditQuestionnareListComponent },
  {
    path: "audit-query-view/:id",
    component: AuditQuestionnareListViewComponent,
  },
  {
    path: "exam-schedule",
    component: ExamScheduleComponent,
  },
  {
    path: "exam-list",
    component: ExamListComponent,
  },
  {
    path: "exams/:id",
    component: AuditExamComponent,
  },
  {
    path: "student-exam-list",
    component: StudentExamListComponent ,
  },
  {
    path: "student-list/:batchId/:examId",
    component: StudentListComponent ,
  },
  {
    path: "individual-answerSheet/:id/:examId",
    component: IndividualAnswerSheetComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditProgramRoutingModule {}
