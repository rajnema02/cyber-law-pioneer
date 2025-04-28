import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-partner-service-desc-project',
  templateUrl: './list-partner-service-desc-project.component.html',
  styleUrls: ['./list-partner-service-desc-project.component.scss']
})
export class ListPartnerServiceDescProjectComponent implements OnInit {
  allData: any[] = [];

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.getPartnerServiceDescProjects();
  }

  getPartnerServiceDescProjects() {
    this.api.get('partnerServicedesc', {}).subscribe((res: any) => {
      this.allData = res?.data || [];
  
      this.allData.forEach((item: any) => {
        // Fetch partner name
        if (item.partnerId) {
          this.api.getById('partner', item.partnerId).subscribe((partnerRes: any) => {
            item.partnerName = partnerRes?.data?.name || 'Unknown Partner';
          });
        }
  
        // Fetch partner service name
        if (item.partnerServiceId) {
          this.api.getById('partnerService', item.partnerServiceId).subscribe((serviceRes: any) => {
            item.partnerServiceName = serviceRes?.data?.name || 'Unknown Service';
          });
        }
      });
    });
  }
  
  

  edit(id: string) {
    this.router.navigate(['/content/create-partner-service-desc', id]);
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this.api.delete('partnerServiceDesc', id).subscribe((resp: any) => {
        alert('Deleted successfully');
        this.getPartnerServiceDescProjects();
      });
    }
  }
}

