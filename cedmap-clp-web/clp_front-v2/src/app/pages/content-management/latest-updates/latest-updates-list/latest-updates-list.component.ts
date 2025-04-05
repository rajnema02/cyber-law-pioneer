import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-latest-updates-list',
  templateUrl: './latest-updates-list.component.html',
  styleUrls: ['./latest-updates-list.component.scss']
})
export class LatestUpdatesListComponent implements OnInit {
  is_inactive = false;
  latestUpdateList:any
  constructor(private api: CoreApiService, private router: Router) {
    this.getLatestUpdateListList();
   }

  ngOnInit(): void {
  }
  getLatestUpdateListList() {
    this.api.get("latestUpdate", {}).subscribe((resp: any) => {
      if (resp) {

        this.latestUpdateList = resp.data;
      }
    });
}
deleteLatestUpdateList(id: any) {
  if (confirm("Are you sure you want to delete this Update?")) {
    this.api.delete("latestUpdate", id).subscribe((resp: any) => {
      if (resp) {
        alert("Update deleted successfully!");
        this.latestUpdateList();
      } else {
        alert(resp);
      }
    });
  }
}
}
