import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router} from "@angular/router";

@Component({
  selector: 'app-landing-partner-project',
  templateUrl: './landing-partner-project.component.html',
  styleUrls: ['./landing-partner-project.component.scss']
})
export class LandingPartnerProjectComponent implements OnInit {
  partnerId: string = '';
  partner: any = {};
  projects: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: CoreApiService,
   private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.partnerId = params.get('id') || '';
      this.getPartnerDetails();
      this.getPartnerProjects();
    });
  }
  

  getPartnerDetails() {
    this.api.getById('partner', this.partnerId).subscribe({
      next: (res: any) => {
        this.partner = res?.data || {};
      },
      error: (err) => {
        console.error('Error fetching partner details:', err);
      }
    });
  }

  getPartnerProjects() {
    this.isLoading = true;
    this.api.get('partnerService', {}).subscribe({
      next: (res: any) => {
        // Filter projects by partnerId (case-sensitive comparison)
        this.projects = (res?.data || []).filter((project: any) => 
          project.partnerId && project.partnerId.toString() === this.partnerId.toString()
        );
        console.log('Filtered projects:', this.projects); // Debug log
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.isLoading = false;
      }
    });
  }
  redirectToPartnerProjectDesc(projectId: string): void {
    this.router.navigate(['partner-project-desc', projectId]);
  }
  
  
}