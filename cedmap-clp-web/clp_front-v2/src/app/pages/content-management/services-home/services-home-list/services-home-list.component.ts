import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-services-home-list',
  templateUrl: './services-home-list.component.html',
  styleUrls: ['./services-home-list.component.scss']
})
export class ServicesHomeListComponent implements OnInit {
  is_inactive = false;
  serviceList:any
  constructor(private api: CoreApiService, private router: Router) {
    this.getServiceList();
   }

  ngOnInit(): void {
  }
  getServiceList() {
    this.api.get("service", {}).subscribe((resp: any) => {
      if (resp) {

        this.serviceList = resp.data;
      }
    });
}
deleteService(id: any) {
  if (confirm("Are you sure you want to delete this service?")) {
    this.api.delete("service", id).subscribe((resp: any) => {
      if (resp) {
        alert("service deleted successfully!");
        this.getServiceList();
      } else {
        alert(resp);
      }
    });
  }
}

}
