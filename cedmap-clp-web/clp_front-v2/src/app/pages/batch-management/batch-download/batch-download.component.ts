import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-batch-download",
  templateUrl: "./batch-download.component.html",
  styleUrls: ["./batch-download.component.scss"],
})
export class BatchDownloadComponent implements OnInit {
  id: any;
  BatchList: any;
  page = 1;
  limit = 1000;
  is_inactive = false;
  userList: any;
  listCount: any;
  cmpName: String = "component1";
  constructor(private api: CoreApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((event) => {
      if (event.id) {
        this.id = event.id;
        if (this.id) {
          this.getBatchId();
          this.getUserList();
        }
      }
    });
    setTimeout(() => {
      this.printComponent(this.cmpName);
    }, 2000);
  }

  ngOnInit(): void {}
  getBatchId() {
    this.api.getById("batch", this.id).subscribe((resp: any) => {
      this.BatchList = resp;
      console.log(this.BatchList);
    });
  }

  getUserList() {
    const queryData = {
      page: this.page,
      limit: 5000,
      is_inactive: this.is_inactive,
      role: "user",
      is_profileVerified: true,
      batch: this.id,
    };

    this.api.get("user", queryData).subscribe((resp: any) => {
      this.userList = resp.data;
      this.listCount = resp.meta.total;
    });
  }
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    // document.body.innerHTML = originalContents;
  }
  printPage() {
    window.print();
  }
}
