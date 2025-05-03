import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuestionPaperComponent } from "src/app/pages/exam/question-paper/question-paper.component";
import { DefaultLayoutComponent } from "./default-layout.component";
import { InstructionPageComponent } from "./instructions/instruction-page/instruction-page.component";
import { VerifyCandicateComponent } from "src/app/pages/verify-candicate/verify-candicate.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { LandingHomeComponent } from "src/app/pages/landing-home/landing-home.component";
import { LandingAboutComponent } from "src/app/pages/landing-about/landing-about.component";
import { LandingCoursesComponent } from "src/app/pages/landing-courses/landing-courses.component";
import { LandingContactComponent } from "src/app/pages/landing-contact/landing-contact.component";
import { LandingProgramComponent } from "src/app/pages/landing-program/landing-program.component";
import { LandingServicesComponent } from "src/app/pages/landing-services/landing-services.component";
import { LandingPracticeComponent } from "src/app/pages/landing-practice/landing-practice.component"; 
import { LandingProgramsCoursesComponent } from "src/app/pages/landing-programs-courses/landing-programs-courses.component";
import { LatestUpdatesHomeComponent } from "src/app/pages/latest-updates-home/latest-updates-home.component";
import { LandingProjectComponent } from "src/app/pages/landing-project/landing-project.component";
import { LandingServiceDetailComponent } from "src/app/pages/landing-service-detail/landing-service-detail.component";
import { LandingProgramsCourseDescriptionComponent } from "src/app/pages/landing-programs-course-description/landing-programs-course-description.component";
import { LandingPartnerProjectComponent } from "src/app/pages/landing-partner-project/landing-partner-project.component";
import { LandingPartnerProjectDescComponent } from "src/app/pages/landing-partner-project-desc/landing-partner-project-desc.component";
import { LandingPartnerComponent } from "src/app/pages/landing-partner/landing-partner.component";

const routes: Routes = [
  // { path: "home", component: HomeComponent },
  { path: "home", component: LandingHomeComponent },
  { path: "about-us", component: LandingAboutComponent },
  { path: "courses", component: LandingCoursesComponent },
  { path: "partner", component: LandingPartnerComponent },
  { path: "partners-project/:title", component: LandingPartnerProjectComponent },
  { path: "Partners-project-desc", component: LandingPartnerProjectDescComponent },
  { path: "contact", component: LandingContactComponent },
  { path: "program", component: LandingProgramComponent },
  { path: "services", component: LandingServicesComponent },
  { path: "practices/:title", component: LandingPracticeComponent },
  { path: "programs/:title", component: LandingProgramsCoursesComponent },
  {
    path: 'program-course-description/:program',
    component: LandingProgramsCourseDescriptionComponent
  },
  
  { path: "latestUpdates", component: LatestUpdatesHomeComponent },
  { path: "projects/:title", component: LandingProjectComponent },
  { path: "serviceDetail/:title", component: LandingServiceDetailComponent },

  {
    path: "instruction",
    component: InstructionPageComponent,
  },
  {
    path: "student-question-paper/:id",
    component: QuestionPaperComponent,
  },
  // {
  //   path: 'verify-candidate/:id',
  //   component: VerifyCandicateComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultLayoutRoutingModule {}
