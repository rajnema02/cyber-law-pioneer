import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BulkUploadComponent } from "./bulk-upload/bulk-upload.component";
import { QuestionComponent } from "./question/question.component";
import { ScheduleExamComponent } from "./schedule-exam/schedule-exam.component";
import { ExamListComponent } from "./exam-list/exam-list.component";
import { QuestionBankComponent } from "./question-bank/question-bank.component";
import { QuestionPaperComponent } from "./question-paper/question-paper.component";
import { StudentExamListComponent } from "./student-exam-list/student-exam-list.component";
import { ResultListComponent } from "./result-list/result-list.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { DemoExamComponent } from "./demo-exam/demo-exam.component";
import { InstructionPageComponent } from "./instruction-page/instruction-page.component";
import { ExamSubmitComponent } from "./exam-submit/exam-submit.component";
import { StudentCertificatesComponent } from "./student-certificates/student-certificates.component";
import { ResultPdfComponent } from "./result-pdf/result-pdf.component";
import { ExamFormComponent } from "./exam-form/exam-form.component";

const routes: Routes = [
  {
    path: "bulk-upload",
    component: BulkUploadComponent,
  },
  {
    path: "question-bank",
    component: QuestionBankComponent,
  },
  {
    path: "schedule-exam",
    component: ScheduleExamComponent,
  },
  {
    path: "exam-list",
    component: ExamListComponent,
  },
  {
    path: "question",
    component: QuestionComponent,
  },
  {
    path: "question-paper/:id",
    component: QuestionPaperComponent,
  },
  {
    path: "student-exam-list",
    component: StudentExamListComponent,
  },
  {
    path: "result-list/:id",
    component: ResultListComponent,
  },
  {
    path: "download-certificate/:id",
    component: CertificateComponent,
  },
  {
    path: "demo-exams",
    component: DemoExamComponent,
  },
  {
    path: "demo-exam",
    component: InstructionPageComponent,
  },
  {
    path: "examform",
    component: ExamFormComponent,
  },
  {
    path: "exam-submit",
    component: ExamSubmitComponent,
  },
  {
    path: "student-certificates",
    component: StudentCertificatesComponent,
  },
  {
    path: "print-pdf/:pass/:id",
    component: ResultPdfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
