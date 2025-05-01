import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentManagementRoutingModule } from './content-management-routing.module';
import { CreateTeamDetailComponent } from './create-team-detail/create-team-detail.component';
import { ServicesOfferListComponent } from './services-offer-list/services-offer-list.component';
// import { CreateServicesOfferComponent } from './create-services-offer/create-services-offer.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { CreateBannerComponent } from './create-banner/create-banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateServicesOfferComponent } from './create-services-offer/create-services-offer.component';
import { CreateOurPracticeComponent } from './our-practice/create-our-practice/create-our-practice.component';
import { OurPracticeListComponent } from './our-practice/our-practice-list/our-practice-list.component';
import { OurPartnerListComponent } from './our-partner/our-partner-list/our-partner-list.component';
import { CreateOurPartnerComponent } from './our-partner/create-our-partner/create-our-partner.component';
import { ViewOurPracticeComponent } from './our-practice/view-our-practice/view-our-practice.component';
import { CreateServicesHomeComponent } from './services-home/create-services-home/create-services-home.component';
import { ServicesHomeListComponent } from './services-home/services-home-list/services-home-list.component';
import { CreateRunningProjectComponent } from './running-projects/create-running-project/create-running-project.component';
import { RunningProjectListComponent } from './running-projects/running-project-list/running-project-list.component';
import { LatestUpdatesListComponent } from './latest-updates/latest-updates-list/latest-updates-list.component';
import { CreateLatestUpdatesComponent } from './latest-updates/create-latest-updates/create-latest-updates.component';
import { PartnerProjectListComponent } from './partner-project/partner-project-list/partner-project-list.component';
import { CreatePartnerProjectComponent } from './partner-project/create-partner-project/create-partner-project.component';
import { CreateServiceDetailsComponent } from './service-details/create-service-details/create-service-details.component';
import { ServiceDetailsListComponent } from './service-details/service-details-list/service-details-list.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { UpdateServiceDetailsComponent } from './service-details/update-service-details/update-service-details.component';
import { UpdateOurPartnerComponent } from './our-partner/update-our-partner/update-our-partner.component';
import { ServiceOfferListCourseComponent } from './service-offer-list-course/service-offer-list-course.component';
import { CreateServiceOfferCourseComponent } from './create-service-offer-course/create-service-offer-course.component';
import { TeamDetailListComponent } from './team-detail-list/team-detail-list.component';
import { RouterModule } from '@angular/router';
import { CreatePartnerServiceProjectComponent } from './partner-service-project/create-partner-service-project/create-partner-service-project.component';
import { ListPartnerServiceProjectComponent } from './partner-service-project/list-partner-service-project/list-partner-service-project.component';
import { ListPartnerServiceDescProjectComponent } from './partner-service-desc-project/list-partner-service-desc-project/list-partner-service-desc-project.component';
import { CreatePartnerServiceDescProjectComponent } from './partner-service-desc-project/create-partner-service-desc-project/create-partner-service-desc-project.component';
import { CreateServiceHomeProjectComponent } from './services-home-project/create-service-home-project/create-service-home-project.component';
import { ListServiceHomeProjectComponent } from './services-home-project/list-service-home-project/list-service-home-project.component';
import { CreateServiceHomeProjectDescComponent } from './service-home-project-desc/create-service-home-project-desc/create-service-home-project-desc.component';
import { ListServiceHomeProjectDescComponent } from './service-home-project-desc/list-service-home-project-desc/list-service-home-project-desc.component';

@NgModule({
  declarations: [
    TeamDetailListComponent,
    CreateTeamDetailComponent,
    ServicesOfferListComponent,
    // CreateServicesOfferComponent,
    BannerListComponent,
    CreateBannerComponent,
    CreateServicesOfferComponent,
    CreateOurPracticeComponent,
    OurPracticeListComponent,
    OurPartnerListComponent,
    CreateOurPartnerComponent,
    ViewOurPracticeComponent,
    CreateServicesHomeComponent,
    ServicesHomeListComponent,
    CreateRunningProjectComponent,
    RunningProjectListComponent,
    LatestUpdatesListComponent,
    CreateLatestUpdatesComponent,
    PartnerProjectListComponent,
    CreatePartnerProjectComponent,
    UpdateOurPartnerComponent,
    CreateServiceDetailsComponent,
    ServiceDetailsListComponent,
    ContactListComponent,
    ServiceOfferListCourseComponent,
    CreateServiceOfferCourseComponent,
    CreatePartnerServiceProjectComponent,
    ListPartnerServiceProjectComponent,
    ListPartnerServiceDescProjectComponent,
    CreatePartnerServiceDescProjectComponent,
    CreateServiceHomeProjectComponent,
    ListServiceHomeProjectComponent,
    CreateServiceHomeProjectDescComponent,
    ListServiceHomeProjectDescComponent
  ],
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ContentManagementModule { }
