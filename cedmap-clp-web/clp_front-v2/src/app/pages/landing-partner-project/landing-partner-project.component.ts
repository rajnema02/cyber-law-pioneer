import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-landing-partner-project',
  templateUrl: './landing-partner-project.component.html',
  styleUrls: ['./landing-partner-project.component.scss']
})
export class LandingPartnerProjectComponent implements OnInit {
  partnerId: string = '';
  partner: any = {};
  projects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: CoreApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.partnerId = params.get('id') || '';
      this.getPartnerDetails();
      this.getPartnerProjects();
    });
  }

  getPartnerDetails() {
    this.api.getById('partner', this.partnerId).subscribe((res: any) => {
      this.partner = res?.data || {};
    });
  }

  getPartnerProjects() {
    this.api.get('partnerService', {}).subscribe((res: any) => {
      // Filter projects by partnerId
      this.projects = (res?.data || []).filter((project: any) => 
        project.partnerId === this.partnerId
      );
    });
  }
}


