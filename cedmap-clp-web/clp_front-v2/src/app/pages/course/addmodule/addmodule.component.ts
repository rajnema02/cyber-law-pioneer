import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-addmodule",
  templateUrl: "./addmodule.component.html",
  styleUrls: ["./addmodule.component.scss"],
})
export class AddmoduleComponent implements OnInit {
  datas: any;
  uniqueCourseTypes: unknown[];
  course_type: any;
  courseList: any;
  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.get("course", {}).subscribe((resp: any) => {
      this.datas = resp.data;
      this.uniqueCourseTypes = Array.from(
        new Set(this.datas.map((course) => course.course_type))
      );
    });
  }

  getCourseList(evt: any) {
    this.course_type = evt.target.value;
    console.log("this.course_type", this.course_type);
    this.api
      .get("course", { course_type: this.course_type })
      .subscribe((resp: any) => {
        console.log(resp);
        this.courseList = resp.data;
      });
  }

  submit(frm: any) {
    if (frm.form.invalid) {
      alert("Please fill all the necessary details");
    } else {
      this.api.post("coursemodule", frm.form.value).subscribe((resp: any) => {
        if (resp) {
          alert("Course Module Created Successfully!!!");
          this.router.navigate(["/course/module-list"]);
        }
      });
    }
  }
}
