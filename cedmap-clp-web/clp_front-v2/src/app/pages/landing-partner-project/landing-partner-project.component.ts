import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.partnerId = params.get('id') || '';
      this.getPartnerDetails();
      this.getPartnerProjects();
    });
  }

  extractYoutubeId(url: string): string {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : '';
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
        this.projects = (res?.data || []).filter((project: any) => 
          project.partnerId && project.partnerId.toString() === this.partnerId.toString()
        );
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