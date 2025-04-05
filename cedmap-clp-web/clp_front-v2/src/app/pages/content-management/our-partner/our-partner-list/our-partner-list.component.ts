import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-our-partner-list',
  templateUrl: './our-partner-list.component.html',
  styleUrls: ['./our-partner-list.component.scss']
})
export class OurPartnerListComponent implements OnInit {
  partnerList: any = [];

  constructor(private api: CoreApiService, private router: Router, private route: ActivatedRoute) { 
    this.getPartnerList();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Received ID:', id);
    });
  }

  /** ✅ Fetch all partner details */
  getPartnerList() {
    this.api.get("partner", {}).subscribe((resp: any) => {
      if (resp) {
        this.partnerList = resp.data;
      }
    });
  }

  /** ✅ Navigate to update partner page */
  updatePartner(id: string) {
    this.router.navigate(['/content/update-partner', id]);
  }

  /** ✅ Delete partner */
  deletePartner(id: string) {
    if (confirm("Are you sure you want to delete this Partner?")) {
      this.api.delete("partner", id).subscribe((resp: any) => {
        if (resp) {
          alert("Partner deleted successfully!");
          this.getPartnerList(); // Refresh the list after delete
        } else {
          alert("Delete failed: " + resp);
        }
      });
    }
  }
}
