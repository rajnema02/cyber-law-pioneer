import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-service-details-list',
  templateUrl: './service-details-list.component.html',
  styleUrls: ['./service-details-list.component.scss']
})
export class ServiceDetailsListComponent implements OnInit {
  serviceDetailList: any = [];

  constructor(private api: CoreApiService, private router: Router, private route: ActivatedRoute) { 
    this.getServiceDetailList();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Received ID:', id);
      // Now you can use this ID to fetch service details
    });
  }

  /** ✅ Fetch all service details */
  getServiceDetailList() {  
    this.api.get("servicedetail", {}).subscribe((resp: any) => {
      if (resp) {
        this.serviceDetailList = resp.data;
      }
    });
  }

  updateService(id: string) {
    this.router.navigate(['/content/update-service-details', id]);
  }
  

  /** ✅ Delete Service */
  deleteService(id: string) {
    if (confirm("Are you sure you want to delete this service?")) {
      this.api.delete("servicedetail", id).subscribe((resp: any) => {
        if (resp) {
          alert("Service deleted successfully!");
          this.getServiceDetailList(); // Refresh the list after delete
        } else {
          alert("Delete failed: " + resp);
        }
      // console.log('Received ID:', id);

      });
    }
  }
}
