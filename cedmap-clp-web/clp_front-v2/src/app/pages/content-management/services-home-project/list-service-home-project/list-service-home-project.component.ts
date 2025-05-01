import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-service-home-project',
  templateUrl: './list-service-home-project.component.html',
  styleUrls: ['./list-service-home-project.component.scss']
})
export class ListServiceHomeProjectComponent implements OnInit {
  serviceProjects: any[] = [];
  isLoading = true;

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getServiceProjects();
  }

  getServiceProjects() {
    this.isLoading = true;
    this.api.get('serviceProject', {}).subscribe({
      next: (res: any) => {
        this.serviceProjects = res?.data || [];
        
        // Fetch service name for each project individually
        this.serviceProjects.forEach((project: any) => {
          if (project.serviceId) {
            this.api.getById('service', project.serviceId).subscribe({
              next: (serviceRes: any) => {
                project.serviceName = serviceRes?.data?.name || 'Unknown Service';
              },
              error: (err) => {
                console.error('Error fetching service:', err);
                project.serviceName = 'Service Load Failed';
              }
            });
          } else {
            project.serviceName = 'No Service';
          }
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.isLoading = false;
      }
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.api.delete('serviceProject', id).subscribe({
        next: () => {
          alert('Project deleted successfully');
          this.getServiceProjects(); // Refresh data
        },
        error: (err) => {
          alert('Error deleting project');
          console.error(err);
        }
      });
    }
  }

  openPdf(filePath: string) {
    window.open(`https://cyberlawpioneers.org/file/download/${filePath}`, '_blank');
  }

  editProject(projectId: string) {
    this.router.navigate(['/content/update-service-home-project', projectId]);
  }
}