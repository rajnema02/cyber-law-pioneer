import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-service-home-project-desc',
  templateUrl: './list-service-home-project-desc.component.html',
  styleUrls: ['./list-service-home-project-desc.component.scss']
})
export class ListServiceHomeProjectDescComponent implements OnInit {
  allData: any[] = [];

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getServiceHomeProjectDescs();
  }

  getServiceHomeProjectDescs() {
    this.api.get('serviceHomeProjectdesc', {}).subscribe((res: any) => {
      this.allData = res?.data || [];

      this.allData.forEach((item: any) => {
        // Fetch service name
        if (item.serviceId) {
          this.api.getById('service', item.serviceId).subscribe((serviceRes: any) => {
            item.serviceName = serviceRes?.data?.name || 'Unknown Service';
          });
        }

        // Fetch program name
        if (item.programId) {
          this.api.getById('program', item.programId).subscribe((programRes: any) => {
            item.programName = programRes?.data?.name || 'Unknown Program';
          });
        }
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/content/create-service-home-project-desc', id]);
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this.api.delete('serviceHomeProjectDesc', id).subscribe((resp: any) => {
        alert('Deleted successfully');
        this.getServiceHomeProjectDescs();
      });
    }
  }
}


