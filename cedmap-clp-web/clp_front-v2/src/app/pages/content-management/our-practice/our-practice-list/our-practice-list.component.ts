import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: 'app-our-practice-list',
  templateUrl: './our-practice-list.component.html',
  styleUrls: ['./our-practice-list.component.scss']
})
export class OurPracticeListComponent implements OnInit {

  is_inactive = false;
  practiceList:any

  constructor(private api: CoreApiService, private router: Router) {
    this.getPartnerList();
   }


  ngOnInit(): void {
   
  }
  getPartnerList() {
    this.api.get("practice", {}).subscribe((resp: any) => {
      if (resp) {

        this.practiceList = resp.data;
      }
    });
}
deletePractice(id: any) {
  if (confirm("Are you sure you want to delete this Practice?")) {
    this.api.delete("practice", id).subscribe((resp: any) => {
      if (resp) {
        alert("Practice deleted successfully!");
        this.getPartnerList();
      } else {
        alert(resp);
      }
    });
  }
}
}
