import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-batch-list",
  templateUrl: "./batch-list.component.html",
  styleUrls: ["./batch-list.component.scss"],
})
export class BatchListComponent implements OnInit {
  batchList: any;
  batch: any;

  constructor(private api: CoreApiService) {
    this.getBatchList();
  }

  getBatchList() {
    this.api.get("batch", {}).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);

        this.batchList = resp.data;
      }
    });
  }

  deleteBatch(id: any) {
    if (confirm("Are you sure you want to delete this batch?")) {
      this.api.delete("batch", id).subscribe((resp: any) => {
        if (resp) {
          alert("Batch deleted successfully!");
          this.getBatchList();
        } else {
          alert(resp);
        }
      });
    }
  }

  ngOnInit(): void {}
}
