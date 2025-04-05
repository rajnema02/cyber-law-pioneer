import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
// import { MatButtonToggleGroup } from "@angular/material/button-toggle";
// import { MatButtonToggleModule } from "@angular/material/button-toggle";
// import { Time } from "@angular/common";

@Component({
  selector: "app-batch-create",
  templateUrl: "./batch-create.component.html",
  styleUrls: ["./batch-create.component.scss"],
})
export class BatchCreateComponent implements OnInit {
  courseList: any;
  course_code: any;
  weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  selectedDays = [];
  // newBatch: any;
  batchName: any;
  desc: any;
  startTime: String;
  endTime: String;
  course_type: any;
  examSchema: Boolean = false;

  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {}

  pushDay(day: String) {
    var index = this.selectedDays.indexOf(day);
    if (index > -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }

    console.log(this.selectedDays);
  }
  isSelected(day: any) {
    return this.selectedDays.filter((o) => o == day).length;
  }

  getExamSchema(evt: any) {
    console.log(evt.target.value);
    if (evt.target.value == "false") {
      this.examSchema = false;
    } else {
      this.examSchema = true;
    }
  }

  submit(frm: any) {
    for (let course of this.courseList) {
      if (course.course_name == frm.form.value.course_name) {
        this.course_code = course.course_code;
      }
    }
    const newBatch = {
      batch_name: frm.form.value.batch_name,
      disclaimer: frm.form.value.disclaimer,
      days: this.selectedDays,
      startTime: frm.form.value.startTime,
      endTime: frm.form.value.endTime,
      startDate: frm.form.value.startDate,
      endDate: frm.form.value.endDate,
      course_type: frm.form.value.course_type,
      course_name: frm.form.value.course_name,
      course_code: this.course_code,
      isAuditExam: frm.form.value.isAuditExam,
      certificationExam: frm.form.value.certificationExam,
      total_no_of_questions: frm.form.value.total_no_of_questions,
      percent_of_course_questions: frm.form.value.percent_of_course_questions,
    };

    if (frm.form.invalid) {
      alert("Please enter all the fields!");
    } else {
      this.api.post("batch", newBatch).subscribe((resp: any) => {
        if (resp) {
          alert("batch Created Successfully!!!");
          this.router.navigate(["/batch/batch-list"]);
        }
      });
    }
  }
  getCourseList(evt: any) {
    console.log(evt);
    this.course_type = evt.target.value;
    this.api
      .get("course", { course_type: this.course_type })
      .subscribe((resp: any) => {
        console.log(resp);
        this.courseList = resp.data;
      });
  }
}
