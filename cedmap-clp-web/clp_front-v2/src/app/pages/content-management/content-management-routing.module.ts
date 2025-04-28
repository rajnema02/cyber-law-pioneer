import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamDetailListComponent} from './team-detail-list/team-detail-list.component';
import {CreateTeamDetailComponent} from './create-team-detail/create-team-detail.component';
import {CreateBannerComponent} from './create-banner/create-banner.component';
import {BannerListComponent} from './banner-list/banner-list.component';
import { ServicesOfferListComponent } from './services-offer-list/services-offer-list.component';
import { CreateServicesOfferComponent } from './create-services-offer/create-services-offer.component';
import { OurPracticeListComponent } from './our-practice/our-practice-list/our-practice-list.component';
import { CreateOurPracticeComponent } from './our-practice/create-our-practice/create-our-practice.component';
import { CreateOurPartnerComponent } from './our-partner/create-our-partner/create-our-partner.component';
import { OurPartnerListComponent } from './our-partner/our-partner-list/our-partner-list.component';
import { ViewOurPracticeComponent } from './our-practice/view-our-practice/view-our-practice.component';
import { CreateServicesHomeComponent } from './services-home/create-services-home/create-services-home.component';
import { ServicesHomeListComponent } from './services-home/services-home-list/services-home-list.component';
import { CreateRunningProjectComponent } from './running-projects/create-running-project/create-running-project.component';
import { RunningProjectListComponent } from './running-projects/running-project-list/running-project-list.component';
import { LatestUpdatesListComponent } from './latest-updates/latest-updates-list/latest-updates-list.component';
import { CreateLatestUpdatesComponent } from './latest-updates/create-latest-updates/create-latest-updates.component';
import { PartnerProjectListComponent } from './partner-project/partner-project-list/partner-project-list.component';
import { CreatePartnerProjectComponent } from './partner-project/create-partner-project/create-partner-project.component';
import { ServiceDetailsListComponent } from './service-details/service-details-list/service-details-list.component';
import { CreateServiceDetailsComponent } from './service-details/create-service-details/create-service-details.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { UpdateServiceDetailsComponent } from './service-details/update-service-details/update-service-details.component';
import { UpdateOurPartnerComponent } from './our-partner/update-our-partner/update-our-partner.component';
import { CreateServiceOfferCourseComponent } from './create-service-offer-course/create-service-offer-course.component';
import { ServiceOfferListCourseComponent } from './service-offer-list-course/service-offer-list-course.component';
import { CreatePartnerServiceProjectComponent } from './partner-service-project/create-partner-service-project/create-partner-service-project.component';
import { ListPartnerServiceProjectComponent } from './partner-service-project/list-partner-service-project/list-partner-service-project.component';
import { CreatePartnerServiceDescProjectComponent } from './partner-service-desc-project/create-partner-service-desc-project/create-partner-service-desc-project.component';
import { ListPartnerServiceDescProjectComponent } from './partner-service-desc-project/list-partner-service-desc-project/list-partner-service-desc-project.component';


const routes: Routes = [
  {
    path: 'team-detail-list',
    component: TeamDetailListComponent
  },
  {
    path: 'create-team-details',
    component: CreateTeamDetailComponent
  },
  {
    path: 'service-offers',
    component: ServicesOfferListComponent
  },
  {
    path: 'create-service-offers',
    component: CreateServicesOfferComponent
  },
  {
    path: 'service-offers-course',
    component: ServiceOfferListCourseComponent
  },
  {
    path: 'create-service-course-offers',
    component: CreateServiceOfferCourseComponent
  },
  {
    path: 'create-banner',
    component: CreateBannerComponent
  },
  {
    path: 'banner-list',
    component: BannerListComponent
  },
  {
    path: 'create-practice',
    component: CreateOurPracticeComponent
  },
  {
    path: 'practice-list',
    component: OurPracticeListComponent
  },
  {
    path: 'create-partner',
    component: CreateOurPartnerComponent
  },
  {
    path: 'partner-list',
    component: OurPartnerListComponent
  },
  {
    path: 'create-partner-service',
    component: CreatePartnerServiceProjectComponent
  },
  {
    path: 'partner-service-list',
    component: ListPartnerServiceProjectComponent
  },
  {
    path: 'create-partner-service-desc',
    component: CreatePartnerServiceDescProjectComponent
  },
  {
    path: 'partner-service-desc-list',
    component: ListPartnerServiceDescProjectComponent
  },
  {
    path: 'update-partner/:id',
    component: UpdateOurPartnerComponent
  },
  {
    path: 'View-practice/:title',
    component: ViewOurPracticeComponent 
  },
  {
    path: 'service-list',
    component: ServicesHomeListComponent
  },
  {
    path: 'create-service',
    component: CreateServicesHomeComponent
  },
  {
    path: 'create-running-project',
    component: CreateRunningProjectComponent
  },
  {
    path: 'running-project-list',
    component: RunningProjectListComponent
  },
  {
    path: 'create-latest-update',
    component: CreateLatestUpdatesComponent
  },
  {
    path: 'latest-update-list',
    component: LatestUpdatesListComponent
  },
  {
    path: 'create-partner-project',
    component: CreatePartnerProjectComponent
  },
  {
    path: 'partner-project-list',
    component: PartnerProjectListComponent
  },
  {
    path: 'create-service-details',
    component: CreateServiceDetailsComponent
  },
  {
    path: 'update-service-details/:id',
    component:UpdateServiceDetailsComponent
  },
  {
    path: 'service-details-list',
    component: ServiceDetailsListComponent
  },
  {
    path: 'contact-list',
    component: ContactListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
