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
import { LandingPracticeComponent } from './pages/landing-practice/landing-practice.component';
import { LandingProgramsCoursesComponent } from './pages/landing-programs-courses/landing-programs-courses.component';
import { LatestUpdatesHomeComponent } from './pages/latest-updates-home/latest-updates-home.component';
import { LandingProjectComponent } from './pages/landing-project/landing-project.component';
import { LandingServiceDetailComponent } from './pages/landing-service-detail/landing-service-detail.component';
import { UpdateServiceDetailsComponent } from './pages/content-management/service-details/update-service-details/update-service-details.component';
import { UpdateOurPartnerComponent } from './pages/content-management/our-partner/update-our-partner/update-our-partner.component';
// import { LandingPartnersComponent } from './pages/landing-partners/landing-partners.component';
// import { CenterRegistrationComponent } from "./pages/center-registration/center-registration.component";



// import { DefaultLayoutComponent } from './layouts/default-layout/default-layout/default-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
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
    LandingPracticeComponent,
    LandingProgramsCoursesComponent,
    LatestUpdatesHomeComponent,
    LandingProjectComponent,
    LandingServiceDetailComponent,
    UpdateServiceDetailsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ConfirmationGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
