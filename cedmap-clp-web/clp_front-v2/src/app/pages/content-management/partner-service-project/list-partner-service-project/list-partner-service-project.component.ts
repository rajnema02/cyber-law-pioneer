import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-partner-service-project',
  templateUrl: './list-partner-service-project.component.html',
  styleUrls: ['./list-partner-service-project.component.scss']
})
export class ListPartnerServiceProjectComponent implements OnInit {
  partnerServiceProjects: any[] = [];
  partnerId: string | null = null;
  partnerName: string = '';
  isLoading: boolean = true;

  constructor(
    private api: CoreApiService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.partnerId = params.get('id');
      this.getPartnerServiceProjects();
      
      // If we have a partnerId, get partner details
      if (this.partnerId) {
        this.getPartnerDetails(this.partnerId);
      }
    });
  }

  getPartnerServiceProjects() {
    this.isLoading = true;
    this.api.get('partnerService', {}).subscribe({
      next: (res: any) => {
        let projects = res?.data || [];
        
        // Filter projects if partnerId is provided
        if (this.partnerId) {
          projects = projects.filter((project: any) => project.partnerId === this.partnerId);
        }
        
        this.partnerServiceProjects = projects;
        
        // Fetch partner names for all projects
        this.fetchPartnerNames();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.isLoading = false;
      }
    });
  }

  getPartnerDetails(partnerId: string) {
    this.api.getById('partner', partnerId).subscribe({
      next: (res: any) => {
        this.partnerName = res?.data?.name || 'Unknown Partner';
      },
      error: (err) => {
        console.error('Error fetching partner details:', err);
        this.partnerName = 'Unknown Partner';
      }
    });
  }

  fetchPartnerNames() {
    // Create a Set of unique partnerIds to minimize API calls
    const uniquePartnerIds = new Set(
      this.partnerServiceProjects
        .filter(project => project.partnerId)
        .map(project => project.partnerId)
    );

    // Fetch each partner's details
    uniquePartnerIds.forEach(partnerId => {
      this.api.getById('partner', partnerId).subscribe((partnerRes: any) => {
        // Update all projects with this partnerId
        this.partnerServiceProjects.forEach(project => {
          if (project.partnerId === partnerId) {
            project.partnerName = partnerRes?.data?.name || 'Unknown Partner';
          }
        });
      });
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.api.delete('partnerService', id).subscribe({
        next: () => {
          alert('Project deleted successfully');
          this.getPartnerServiceProjects(); // Refresh list
        },
        error: (err) => {
          console.error('Error deleting project:', err);
          alert('Failed to delete project');
        }
      });
    }
  }

  openPdf(filePath: string) {
    if (filePath) {
      window.open(filePath, '_blank');
    } else {
      alert('PDF file not available');
    }
  }

  editProject(projectId: string) {
    this.router.navigate(['/content/update-partner-service-project', projectId]);
  }

  // Add a method to navigate back if viewing filtered projects
  goBackToList() {
    this.router.navigate(['/content/list-partner-service-project']);
  }
}