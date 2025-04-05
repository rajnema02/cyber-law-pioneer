import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-landing-services",
  templateUrl: "./landing-services.component.html",
  styleUrls: ["./landing-services.component.scss", "./base.css"],
})
export class LandingServicesComponent implements OnInit {
  serviceList:any
  constructor(private api: CoreApiService, private router: Router) {
    this.getServiceList();
  }

  ngOnInit(): void {}
  getServiceList() {
    this.api.get("service", {}).subscribe((resp: any) => {
      if (resp) {

        this.serviceList = resp.data;
      }
    });
}
redirectToRoute(title: string): void {
  this.router.navigate(['/serviceDetail', title]);
}
}
