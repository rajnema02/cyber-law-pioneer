import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  course_type: any;
  courseList: any;
  courses: any;
  uniqueCourseTypes: unknown[];
  id: any;
  datas: any;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((resp: any) => {
      this.id = resp.id;
      // console.log("this.id", this.id);
    });
    this.api.getById("center", this.id).subscribe((resp: any) => {
      // console.log("data", resp);
      this.datas = resp;
      console.log("this.datas", this.datas);
    });
    this.api.get("course", {}).subscribe((resp: any) => {
      // console.log(resp);
      this.courses = resp.data;
      this.uniqueCourseTypes = Array.from(
        new Set(this.courses.map((course) => course.course_type))
      );
    });
  }

  submit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the details");
    } else {
      this.api.put("center", this.id, frm.form.value).subscribe((resp: any) => {
        if (resp) {
          alert("Data Updated successfully");
          this.router.navigate(["/center/center-list"]);
        }
      });
    }
  }

  getCourseList(evt: any) {
    this.course_type = evt.target.value;
    this.api
      .get("course", { course_type: this.course_type })
      .subscribe((resp: any) => {
        console.log(resp);
        this.courseList = resp.data;
      });
  }
}
