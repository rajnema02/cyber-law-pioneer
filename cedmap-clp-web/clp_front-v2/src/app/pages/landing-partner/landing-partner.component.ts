import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-landing-partner',
  templateUrl: './landing-partner.component.html',
  styleUrls: ['./landing-partner.component.scss']
})
export class LandingPartnerComponent implements OnInit {

  partnerList: any;
 
  constructor(private api: CoreApiService, private router: Router) {
    this.getPartnerList();
  }

  ngOnInit(): void {
    
  }

  getPartnerList() {
    this.api.get("partner", {}).subscribe((resp: any) => {
      if (resp) {
        this.partnerList = resp.data;
        console.log("All Partners: ", this.partnerList);
      }
    });
  }

  redirectToPartnerProjects(partnerId: string): void {
    this.router.navigate(['/partners-project', partnerId]);
  }
}