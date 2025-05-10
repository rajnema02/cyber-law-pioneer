import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-service-project',
  templateUrl: './landing-service-project.component.html',
  styleUrls: ['./landing-service-project.component.scss']
})
export class LandingServiceProjectComponent implements OnInit {
  serviceId: string = '';
  serviceName: string = 'Service'; // Initialize with default
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
      this.serviceId = params.get('id') || '';
      if (this.serviceId) {
        this.fetchServiceName();
        this.getServiceProjects();
      } else {
        this.isLoading = false;
      }
    });
  }

  fetchServiceName() {
    this.api.getById('service', this.serviceId).subscribe({
      next: (res: any) => {
        const service = res?.data;
        if (service && !service.deleted_at && !service.disabled && !service.is_inactive) {
          this.serviceName = service.name || 'Service';
        }
      },
      error: (err) => {
        console.error('Error fetching service name:', err);
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

  extractVideoId(url: string): string {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : '';
  }
}