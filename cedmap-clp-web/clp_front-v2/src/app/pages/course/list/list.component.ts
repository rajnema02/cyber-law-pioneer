import { Component } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  courseList: any;

  constructor(private api: CoreApiService) {
    this.getCourseList();
  }

  getCourseList() {
    this.api.get("course", {}).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);

        this.courseList = resp.data;
      }
    });
  }
}
