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

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getserviceProjects();
  }

  getserviceProjects() {
    this.api.get('serviceProject', {}).subscribe((res: any) => {
      this.serviceProjects = res?.data || [];

      // Fetch service names using serviceId
      this.serviceProjects.forEach(project => {
        if (project.serviceId) {
          this.api.getById('service', project.serviceId).subscribe((serviceRes: any) => {
            project.serviceName = serviceRes?.data?.name || 'Unknown service';
          });
        }
      });
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.api.delete('serviceProject', id).subscribe(() => {
        alert('Project deleted successfully');
        this.getserviceProjects(); // Refresh list
      });
    }
  }

  openPdf(filePath: string) {
    window.open(filePath, '_blank');
  }

  editProject(projectId: string) {
    this.router.navigate(['/content/update-service-service-project', projectId]);
  }
  // Add this to your component if you don't have it already
  extractVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }
}
