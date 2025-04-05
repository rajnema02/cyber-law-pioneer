import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  centerList: any;
  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.get("center", {}).subscribe((resp: any) => {
      if (resp) {
        this.centerList = resp.data;
      }
    });
  }
}
