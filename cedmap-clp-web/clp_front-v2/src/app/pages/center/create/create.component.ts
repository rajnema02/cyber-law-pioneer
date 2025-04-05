import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  courseTypes: string[] = [];
  courseList: { [key: string]: any[] } = {};
  selectedCourses: { course_type: string; course_name: string }[] = [];
  courses: any;
  uniqueCourseTypes: unknown[];

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {
    // Your existing code for fetching course data
    this.api.get("course", {}).subscribe((resp: any) => {
      this.courses = resp.data;
      this.uniqueCourseTypes = Array.from(
        new Set(this.courses.map((course) => course.course_type))
      );

      // Initialize selectedCourses after uniqueCourseTypes is populated
      this.selectedCourses = this.uniqueCourseTypes.map((courseType) => ({
        course_type: courseType as string,
        course_name: "",
      }));
    });
  }

  submit(frm: NgForm) {
    if (frm.form.invalid) {
      alert("Please fill all the details");
    } else {
      console.log("Selected Courses", this.selectedCourses);
      console.log("Selected Courses Types", this.courseTypes);
      console.log("frm.form.value", frm.form.value);
      return;
      // Adjust the form data based on your requirements

      this.api.post("center", frm.form.value).subscribe((resp: any) => {
        if (resp) {
          alert("Data added successfully");
          this.router.navigate(["/center/center-list"]);
        }
      });
    }
  }

  getCourseList(courseType: string): any[] {
    return this.courseList[courseType] || [];
  }

  onCourseTypeChange(courseType: string) {
    if (!this.courseList[courseType]) {
      this.api
        .get("course", { course_type: courseType })
        .subscribe((resp: any) => {
          this.courseList[courseType] = resp.data;
        });
    }
  }

  onCourseNameChange(courseType: string, courseName: string) {
    const selectedCourse = { course_type: courseType, course_name: courseName };

    // Check if the course is already selected
    if (
      !this.selectedCourses.find(
        (course) =>
          course.course_type === courseType && course.course_name === courseName
      )
    ) {
      this.selectedCourses.push(selectedCourse);
    }
  }
}
