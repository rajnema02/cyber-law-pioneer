import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-batch-update",
  templateUrl: "./batch-update.component.html",
  styleUrls: ["./batch-update.component.scss"],
})
export class BatchUpdateComponent implements OnInit {
  id: any;
  batch: any;
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
  batch_name: any;
  disclaimer: any;
  startTime: String;
  endTime: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: CoreApiService
  ) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      if (this.id) {
        console.log(this.id);
        this.getBatchId();
      }
    });
  }

  ngOnInit(): void {}
  getBatchId() {
    this.api.getById("batch", this.id).subscribe((resp: any) => {
      this.batch = resp;

      this.selectedDays = resp.days;
      console.log(this.batch);
    });
  }
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
  submit(frm: any) {
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
      total_no_of_questions: frm.form.value.total_no_of_questions,
      percent_of_course_questions: frm.form.value.percent_of_course_questions,
    };
    console.log(newBatch);

    this.api.put("batch", this.id, newBatch).subscribe((resp: any) => {
      if (resp) {
        alert("batch updated Successfully!!!");
        this.router.navigate(["/batch/batch-list"]);
      }
    });
  }
}
