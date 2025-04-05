import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";


@Component({
  selector: 'app-services-offer-list',
  templateUrl: './services-offer-list.component.html',
  styleUrls: ['./services-offer-list.component.scss']
})
export class ServicesOfferListComponent implements OnInit {
  is_inactive = false;
  servicesList:any

  constructor(private api: CoreApiService, private router: Router) {
    this.getServiceList();
   }

  ngOnInit(): void {
    
  }
  getServiceList() {
    this.api.get("servicesOffers", {}).subscribe((resp: any) => {
      if (resp) {

        this.servicesList = resp.data;
      }
    });
}
deleteService(id: any) {
  if (confirm("Are you sure you want to delete this Program?")) {
    this.api.delete("servicesOffers", id).subscribe((resp: any) => {
      if (resp) {
        alert("Program deleted successfully!");
        this.getServiceList();
      } else {
        alert(resp);
      }
    });
  }
}
}
