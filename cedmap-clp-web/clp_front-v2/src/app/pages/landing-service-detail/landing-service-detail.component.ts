import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-service-detail',
  templateUrl: './landing-service-detail.component.html',
  styleUrls: ['./landing-service-detail.component.scss']
})
export class LandingServiceDetailComponent implements OnInit {
  serviceDetailList: any;
  filteredServiceDetailList: any = [];
  programTitle: string | null = '';
  constructor( private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.programTitle = params.get('title');  // Get the program title from the route
      this.getProjectList();  // Call getProjectList after the programTitle is set
    });
  }
  getProjectList(): void {
    this.api.get("servicedetail", {}).subscribe((resp: any) => {
      if (resp) {
        this.serviceDetailList = resp.data;
        console.log("servicedetail: ", this.serviceDetailList);

        // Filter projects where the partnerName matches the programTitle
        this.filteredServiceDetailList = this.serviceDetailList.filter(service => {
          return (
            service.serviceName &&
            this.programTitle &&
            service.serviceName.toLowerCase() === this.programTitle.toLowerCase()
          );
        });

        console.log("Filtered services: ", this.filteredServiceDetailList);
      }
    });
  }
}
