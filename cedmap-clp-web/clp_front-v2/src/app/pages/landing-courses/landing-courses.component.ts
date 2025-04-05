import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";


@Component({
  selector: "app-landing-courses",
  templateUrl: "./landing-courses.component.html",
  styleUrls: ["./landing-courses.component.scss", "./base.css"],
})
export class LandingCoursesComponent implements OnInit {

  partnerList:any
 
  constructor(private api: CoreApiService, private router: Router,) {
    this.getPartnerList();
   }

  ngOnInit(): void {
    
  }
  getPartnerList() {
    this.api.get("partner", {}).subscribe((resp: any) => {
      if (resp) {

        this.partnerList = resp.data;
        console.log("All Practices: ", this.partnerList)
      }
    });
}
redirectToRoute(title: string): void {
  this.router.navigate(['/projects', title]);
}
}