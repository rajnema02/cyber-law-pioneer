import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-landing-partner-project-desc',
  templateUrl: './landing-partner-project-desc.component.html',
  styleUrls: ['./landing-partner-project-desc.component.scss']
})
export class LandingPartnerProjectDescComponent implements OnInit {
  partnerServiceId: string = '';
  partnerService: any = {};
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
      this.partnerServiceId = params.get('id') || '';
      if (this.partnerServiceId) {
        this.getPartnerServiceDetails();
        this.getServiceDescriptionsByPartnerServiceId();
      } else {
        this.errorMessage = 'Invalid Partner Service ID';
        this.isLoading = false;
      }
    });
  }

  getPartnerServiceDetails() {
    this.api.getById('partnerService', this.partnerServiceId).subscribe({
      next: (res: any) => {
        this.partnerService = res?.data || {};
        console.log('Partner Service Details:', this.partnerService);
      },
      error: (err) => {
        console.error('Error fetching partner service:', err);
        this.errorMessage = 'Failed to load partner service details';
      }
    });
  }

  getServiceDescriptionsByPartnerServiceId() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Create strict query to match only the specific partnerServiceId
    const query = { 
      partnerServiceId: this.partnerServiceId 
    };

    this.api.get('partnerServiceDesc', query).subscribe({
      next: (res: any) => {
        // Filter results to ensure only exact matches are included
        this.descriptions = (res?.data || []).filter((desc: any) => 
          desc.partnerServiceId === this.partnerServiceId
        );
        
        console.log('Filtered Descriptions:', this.descriptions);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching descriptions:', err);
        this.errorMessage = 'Failed to load service descriptions';
        this.isLoading = false;
      }
    });
  }

  redirectToEditDescription(descriptionId: string): void {
    this.router.navigate(['edit-partner-service-desc', descriptionId]);
  }
}