import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-updates-home',
  templateUrl: './latest-updates-home.component.html',
  styleUrls: ['./latest-updates-home.component.scss']
})
export class LatestUpdatesHomeComponent implements OnInit {
  latestUpdateList:any
  constructor(private api: CoreApiService,private router: Router) { }

  ngOnInit(): void {
    this.getLatestUpdateListList()
  }
  getLatestUpdateListList() {
    this.api.get("latestUpdate", {}).subscribe((resp: any) => {
      if (resp && resp.data) {
        // Sort the updates by created_at (descending order)
        this.latestUpdateList = resp.data.sort((a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();  // Latest first
        });
      }
    });
  }
  
}
