import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { UserListComponent } from "src/app/pages/user-list/user-list.component";
import { ReceiptComponent } from "src/app/pages/receipt/receipt.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { AboutProgramComponent } from "src/app/pages/about-program/about-program.component";
import { StudentIdComponent } from "src/app/pages/student-id/student-id.component";
import { QuestionPaperComponent } from "src/app/pages/exam/question-paper/question-paper.component";
import { PaymentHistoryComponent } from "src/app/pages/payment-history/payment-history.component";
import { PaymentConfirmationComponent } from "src/app/pages/payment-confirmation/payment-confirmation.component";
import { KnowledgeBankComponent } from "src/app/pages/knowledge-bank/knowledge-bank.component";
import { KnowledgeBankCreateComponent } from "src/app/pages/knowledge-bank-create/knowledge-bank-create.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-list", component: UserListComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "about-program", component: AboutProgramComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "users", component: UserListComponent },
  { path: "receipt/:id/:term", component: ReceiptComponent },
  { path: "receipt/:id", component: ReceiptComponent },
  { path: "candidateReceipt", component: ReceiptComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "candidateProfile", component: ProfileComponent },
  { path: "student-id", component: StudentIdComponent },
  { path: "question-paper", component: QuestionPaperComponent },

  { path: "payment-status", component: PaymentConfirmationComponent },
  { path: "viewpayment", component: PaymentHistoryComponent },
  { path: "knowledge-bank", component: KnowledgeBankComponent },

  { path: "knowledge-bank-create", component: KnowledgeBankCreateComponent },

  {
    path: "course",
    loadChildren: () =>
      import("../../pages/course/course.module").then((n) => n.CourseModule),
  },
  {
    path: "audit",
    loadChildren: () =>
      import("../../pages/audit-program/audit-program.module").then(
        (n) => n.AuditProgramModule
      ),
  },
  {
    path: "center",
    loadChildren: () =>
      import("../../pages/center/center.module").then((n) => n.CenterModule),
  },
  {
    path: "study",
    loadChildren: () =>
      import("../../pages/study-material/study-material.module").then(
        (n) => n.StudyMaterialModule
      ),
  },
  {
    path: "batch",
    loadChildren: () =>
      import("../../pages/batch-management/batch-management.module").then(
        (n) => n.BatchManagementModule
      ),
  },
  {
    path: "message",
    loadChildren: () =>
      import("../../pages/message/message.module").then((n) => n.MessageModule),
  },
  {
    path: "exam",
    loadChildren: () =>
      import("../../pages/exam/exam.module").then((n) => n.ExamModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../pages/user-management/user-management.module").then(
        (n) => n.UserManagementModule
      ),
  },
  {
    path: "setting",
    loadChildren: () =>
      import("../../pages/profile-setting/profile-setting.module").then(
        (n) => n.ProfileSettingModule
      ),
  },
  {
    path: "master",
    loadChildren: () =>
      import("../../pages/master-data/master-data.module").then(
        (n) => n.MasterDataModule
      ),
  },
  {
    path: "about",
    loadChildren: () =>
      import("../../pages/about-programs/about-programs.module").then(
        (n) => n.AboutProgramsModule
      ),
  },
  {
    path: "content",
    loadChildren: () =>
      import("../../pages/content-management/content-management.module").then((n) => n.ContentManagementModule),
  },
];
