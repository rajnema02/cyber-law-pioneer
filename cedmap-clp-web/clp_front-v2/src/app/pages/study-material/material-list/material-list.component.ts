import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-material-list",
  templateUrl: "./material-list.component.html",
  styleUrls: ["./material-list.component.scss"],
})
export class MaterialListComponent implements OnInit {
  courseList: any;
  env: any;
  course_name: any;
  selectedFormQuery: any;
  page = 1;
  limit = 20;
  is_inactive = false;
  emptySearch = true;

  listCount: any = 0;
  constructor(private api: CoreApiService) {
    this.env = environment;
    this.getCourseList();
  }

  ngOnInit(): void {}
  getCourseList() {
    this.isEmptySearch();
    const data = {
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
      ...this.selectedFormQuery,
    };
    if (this.course_name) {
      data["course_name"] = this.course_name;
    }
    this.api.get("study", data).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.courseList = resp.data;
        this.listCount = resp.meta.total;
      }
    });
  }
  clearFilter() {
    this.course_name = "";
    this.getCourseList();
  }

  isEmptySearch() {
    if (this.course_name) {
      this.emptySearch = false;
    } else {
      this.emptySearch = true;
    }
  }

  deleteContent(id: any) {
    console.log(id);

    if (confirm("Are You Sure?")) {
      const data = {
        is_inactive: true,
      };
      this.api.put("study", id, data).subscribe((resp: any) => {
        if (resp) {
          alert("Deleted Successfully!!");
          this.getCourseList();
        }
      });
    } else {
      alert("Unable to delete .");
      this.getCourseList();
    }
  }
}
