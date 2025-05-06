import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-service-project-desc',
  templateUrl: './landing-service-project-desc.component.html',
  styleUrls: ['./landing-service-project-desc.component.scss']
})
export class LandingServiceProjectDescComponent implements OnInit {
  serviceProjectId: string = '';
  serviceProject: any = {};
  descriptions: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private api: CoreApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceProjectId = params.get('id') || '';
      if (this.serviceProjectId) {
        this.getServiceProjectDetails();
        this.getProjectDescriptions();
      } else {
        this.errorMessage = 'Invalid Project ID';
        this.isLoading = false;
      }
    });
  }

  getServiceProjectDetails() {
    this.api.getById('serviceProject', this.serviceProjectId).subscribe({
      next: (res: any) => {
        this.serviceProject = res?.data || {};
      },
      error: (err) => {
        console.error('Error fetching service project:', err);
        this.errorMessage = 'Failed to load project details';
      }
    });
  }

  getProjectDescriptions() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Create query to match the specific serviceProjectId
    const query = { 
      serviceProjectId: this.serviceProjectId 
    };

    this.api.get('serviceProjectDesc', query).subscribe({
      next: (res: any) => {
        // Filter results to ensure only exact matches are included
        this.descriptions = (res?.data || []).filter((desc: any) => 
          desc.serviceProjectId === this.serviceProjectId
        );

        // Fetch service names for each description
        this.descriptions.forEach(desc => {
          if (desc.serviceId) {
            this.api.getById('service', desc.serviceId).subscribe((serviceRes: any) => {
              desc.serviceName = serviceRes?.data?.name || 'Unknown Service';
            });
          }
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching descriptions:', err);
        this.errorMessage = 'Failed to load project descriptions';
        this.isLoading = false;
      }
    });
  }
}