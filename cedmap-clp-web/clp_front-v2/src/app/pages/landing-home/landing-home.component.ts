import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-landing-home",
  templateUrl: "./landing-home.component.html",
  styleUrls: ["./landing-home.component.scss", "./base.css"],
})
export class LandingHomeComponent implements OnInit {

  
  latestUpdateList:any
  teamList: any;
  runningProjectList:any
  bannerList: any;
  items = [
    { title: 'CSMS', icon: '../../../../assets/icon/engineer.png' },
    { title: 'NASSCOM', icon: '../../../../assets/icon/solution.png' },
    { title: 'Network Security Service', icon: '../../../../assets/icon/data-transmission.png' },
    { title: 'DSCI', icon: '../../../../assets/icon/data-transmission.png' },
    { title: 'CEDMAP', icon: '../../../../assets/icon/consultant.png' }
  ];
  constructor(private api: CoreApiService,private router: Router) {}

 
  ngOnInit(): void {
    this.getBannerList();
    this.getTeamList();
    this.getLatestUpdateListList()
    this.getRunningProjectsList()
  }
  getTeamList() {
    this.api.get("teamDetails", {}).subscribe((resp: any) => {
      if (resp) {
        this.teamList = resp.data;
        console.log(this.teamList);  
      }
    });
  }

  getBannerList() {
    this.api.get("banner", {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        // Sorting banners by created_at date (latest first) and limiting to the top 2
        this.bannerList = resp.data
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 2);
      }
    });
  }
  
  getLatestUpdateListList() {
    this.api.get("latestUpdate", {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        // Sort the updates by 'created_at' in descending order (latest first)
        this.latestUpdateList = resp.data
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 2); // Get the latest two updates
      }
    });
  }
  getRunningProjectsList() {
    this.api.get("runningProjects", {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        // Sorting the projects by created_at date to get the latest ones
        this.runningProjectList = resp.data
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())  // Sorting by date, latest first
          .slice(0, 2);  // Slice to get only the first two latest projects
      }
    });
  }
  
  redirectToRoute(title: string): void {
    this.router.navigate(['practices/:title', title]);  
  }
}
