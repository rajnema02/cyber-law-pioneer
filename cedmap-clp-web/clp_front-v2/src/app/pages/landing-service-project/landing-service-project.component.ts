import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-landing-service-project',
  templateUrl: './landing-service-project.component.html',
  styleUrls: ['./landing-service-project.component.scss']
})
export class LandingServiceProjectComponent implements OnInit {
  serviceId: string = '';
  serviceName: string = '';
  projects: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: CoreApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id') || '';
      this.fetchServiceName();
      this.getServiceProjects();
    });
  }

  fetchServiceName() {
    this.api.getById('service', this.serviceId).subscribe({
      next: (res: any) => {
        const service = res?.data;
  
        // Only accept if not deleted or disabled
        if (
          service &&
          !service.deleted_at &&
          !service.disabled &&
          !service.is_inactive
        ) {
          this.serviceName = service.name || 'Service';
        } else {
          this.serviceName = 'Service (Unavailable)';
        }
      },
      error: (err) => {
        console.error('Error fetching service name:', err);
        this.serviceName = 'Service';
      }
    });
  }
  

  getServiceProjects() {
    this.isLoading = true;
    this.api.get('serviceProject', {}).subscribe({
      next: (res: any) => {
        this.projects = (res?.data || []).filter(
          (project: any) => project.serviceId?.toString() === this.serviceId
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.isLoading = false;
      }
    });
  }

  redirectToServiceProjectDesc(projectId: string): void {
    this.router.navigate(['services-project-desc', projectId]);
  }
}
