import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  is_inactive = false;
  bannerList:any

  constructor(private api: CoreApiService, private router: Router) {
    this.getBannerList();
   }

  ngOnInit(): void {
    
  }
  getBannerList() {
    this.api.get("banner", {}).subscribe((resp: any) => {
      if (resp) {

        this.bannerList = resp.data;
      }
    });
}
deleteBanner(id: any) {
  if (confirm("Are you sure you want to delete this Banner?")) {
    this.api.delete("banner", id).subscribe((resp: any) => {
      if (resp) {
        alert("Banner deleted successfully!");
        this.getBannerList();
      } else {
        alert(resp);
      }
    });
  }
}
}
