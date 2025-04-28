import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-partner-service-project',
  templateUrl: './list-partner-service-project.component.html',
  styleUrls: ['./list-partner-service-project.component.scss']
})
export class ListPartnerServiceProjectComponent implements OnInit {

  partnerServiceProjects: any[] = [];

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getPartnerServiceProjects();
  }

  getPartnerServiceProjects() {
    this.api.get('partnerService', {}).subscribe((res: any) => {
      this.partnerServiceProjects = res?.data || [];

      // Fetch partner names using partnerId
      this.partnerServiceProjects.forEach(project => {
        if (project.partnerId) {
          this.api.getById('partner', project.partnerId).subscribe((partnerRes: any) => {
            project.partnerName = partnerRes?.data?.name || 'Unknown Partner';
          });
        }
      });
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.api.delete('partnerService', id).subscribe(() => {
        alert('Project deleted successfully');
        this.getPartnerServiceProjects(); // Refresh list
      });
    }
  }

  openPdf(filePath: string) {
    window.open(filePath, '_blank');
  }

  editProject(projectId: string) {
    this.router.navigate(['/content/update-partner-service-project', projectId]);
  }
}
