import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TokenInterceptor } from "./services/token-interceptor";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { ReceiptComponent } from "./pages/receipt/receipt.component";
import { AdminLoginComponent } from "./pages/admin-login/admin-login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserModule } from "@angular/platform-browser";
import { AboutProgramComponent } from "./pages/about-program/about-program.component";
import { CKEditorModule } from "ckeditor4-angular";
import { StudentIdComponent } from "./pages/student-id/student-id.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { ForgetPasswordComponent } from "./pages/forget-password/forget-password.component";
import { ConfirmationGuardService } from "./services/confirmation-guard.service";
import { VerifyCandicateComponent } from "./pages/verify-candicate/verify-candicate.component";
import { HomeComponent } from "./pages/home/home.component";
import { PaymentHistoryComponent } from "./pages/payment-history/payment-history.component";
import { PaymentConfirmationComponent } from "./pages/payment-confirmation/payment-confirmation.component";
import { KnowledgeBankComponent } from "./pages/knowledge-bank/knowledge-bank.component";
import { KnowledgeBankCreateComponent } from "./pages/knowledge-bank-create/knowledge-bank-create.component";
import { LandingAboutComponent } from './pages/landing-about/landing-about.component';
import { LandingContactComponent } from './pages/landing-contact/landing-contact.component';
import { LandingCoursesComponent } from './pages/landing-courses/landing-courses.component';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { LandingProgramComponent } from './pages/landing-program/landing-program.component';
import { LandingServicesComponent } from './pages/landing-services/landing-services.component';
// import { LandingPartnerComponent } from './pages/landing-partner/landing-partner.component';
import { LandingProgramsCoursesComponent } from './pages/landing-programs-courses/landing-programs-courses.component';
import { LatestUpdatesHomeComponent } from './pages/latest-updates-home/latest-updates-home.component';
import { LandingProjectComponent } from './pages/landing-project/landing-project.component';
import { LandingServiceDetailComponent } from './pages/landing-service-detail/landing-service-detail.component';
import { UpdateServiceDetailsComponent } from './pages/content-management/service-details/update-service-details/update-service-details.component';
import { UpdateOurPartnerComponent } from './pages/content-management/our-partner/update-our-partner/update-our-partner.component';
import { LandingProgramsCourseDescriptionComponent } from './pages/landing-programs-course-description/landing-programs-course-description.component';

// Content Management Components
import { TeamDetailListComponent } from './pages/content-management/team-detail-list/team-detail-list.component';
import { BannerListComponent } from './pages/content-management/banner-list/banner-list.component';
import { CreateBannerComponent } from './pages/content-management/create-banner/create-banner.component';
import { CreateServicesOfferComponent } from './pages/content-management/create-services-offer/create-services-offer.component';
import { CreateTeamDetailComponent } from './pages/content-management/create-team-detail/create-team-detail.component';
import { CreateLatestUpdatesComponent } from './pages/content-management/latest-updates/create-latest-updates/create-latest-updates.component';
import { LatestUpdatesListComponent } from './pages/content-management/latest-updates/latest-updates-list/latest-updates-list.component';
import { CreateOurPartnerComponent } from './pages/content-management/our-partner/create-our-partner/create-our-partner.component';
import { OurPartnerListComponent } from './pages/content-management/our-partner/our-partner-list/our-partner-list.component';
import { CreateOurPracticeComponent } from './pages/content-management/our-practice/create-our-practice/create-our-practice.component';
import { OurPracticeListComponent } from './pages/content-management/our-practice/our-practice-list/our-practice-list.component';
import { CreatePartnerProjectComponent } from './pages/content-management/partner-project/create-partner-project/create-partner-project.component';
import { PartnerProjectListComponent } from './pages/content-management/partner-project/partner-project-list/partner-project-list.component';
import { CreateRunningProjectComponent } from './pages/content-management/running-projects/create-running-project/create-running-project.component';
import { RunningProjectListComponent } from './pages/content-management/running-projects/running-project-list/running-project-list.component';
import { CreateServiceDetailsComponent } from './pages/content-management/service-details/create-service-details/create-service-details.component';
import { ServiceDetailsListComponent } from './pages/content-management/service-details/service-details-list/service-details-list.component';
import { CreateServicesHomeComponent } from './pages/content-management/services-home/create-services-home/create-services-home.component';
import { ServicesHomeListComponent } from './pages/content-management/services-home/services-home-list/services-home-list.component';
import { ServicesOfferListComponent } from './pages/content-management/services-offer-list/services-offer-list.component';
import { LandingPartnerProjectComponent } from './pages/landing-partner-project/landing-partner-project.component';
import { LandingPartnerProjectDescComponent } from './pages/landing-partner-project-desc/landing-partner-project-desc.component';
import { LandingServiceProjectComponent } from './pages/landing-service-project/landing-service-project.component';
import { LandingServiceProjectDescComponent } from './pages/landing-service-project-desc/landing-service-project-desc.component';
import { LandingPracticeComponent } from "./pages/landing-practice/landing-practice.component";
import { LandingPartnerComponent } from './pages/landing-partner/landing-partner.component';
// import { LandingpartnerComponent } from "./pages/landing-practice/landing-partner.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    NgxPaginationModule,
    CKEditorModule,
    MatButtonToggleModule,
    MatButtonModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserListComponent,
    ReceiptComponent,
    AdminLoginComponent,
    ProfileComponent,
    AboutProgramComponent,
    StudentIdComponent,
    ForgetPasswordComponent,
    VerifyCandicateComponent,
    HomeComponent,
    PaymentHistoryComponent,
    PaymentConfirmationComponent,
    KnowledgeBankComponent,
    KnowledgeBankCreateComponent,
    LandingAboutComponent,
    LandingContactComponent,
    LandingCoursesComponent,
    LandingHomeComponent,
    LandingProgramComponent,
    LandingServicesComponent,
    // LandingPartnerComponent,
    LandingPracticeComponent,
    LandingProgramsCoursesComponent,
    LatestUpdatesHomeComponent,
    LandingProjectComponent,
    LandingServiceDetailComponent,
    UpdateServiceDetailsComponent,
    // UpdateOurPartnerComponent,
    LandingProgramsCourseDescriptionComponent,
    LandingPartnerProjectComponent,
    LandingPartnerProjectDescComponent,
    LandingServiceProjectComponent,
    LandingServiceProjectDescComponent,
    LandingPartnerComponent,
    
    // Content Management Components
    // BannerListComponent,
    // CreateBannerComponent,
    // CreateServicesOfferComponent,
    // CreateTeamDetailComponent,
    // CreateLatestUpdatesComponent,
    // LatestUpdatesListComponent,
    // CreateOurPartnerComponent,
    // OurPartnerListComponent,
    // CreateOurPracticeComponent,
    // OurPracticeListComponent,
    // CreatePartnerProjectComponent,
    // PartnerProjectListComponent,
    // CreateRunningProjectComponent,
    // RunningProjectListComponent,
    // CreateServiceDetailsComponent,
    // ServiceDetailsListComponent,
    // CreateServicesHomeComponent,
    // ServicesHomeListComponent,
    // ServicesOfferListComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ConfirmationGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}