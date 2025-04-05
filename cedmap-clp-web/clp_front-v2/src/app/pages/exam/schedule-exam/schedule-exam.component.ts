import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-schedule-exam",
  templateUrl: "./schedule-exam.component.html",
  styleUrls: ["./schedule-exam.component.scss"],
})
export class ScheduleExamComponent implements OnInit {
  batchList: any;
  courseList: any;
  course_type: any;
  course_name: any;
  batch_id: any = [];
  duration: any = "--";
  constructor(private api: CoreApiService, private router: Router) {}

  ngOnInit(): void {}

  // getBatches(){
  //   this.api.get("batch",{}).subscribe((resp: any)=>{
  //     this.batchList = resp.data;
  //     console.log(this.batchList);
  //   })
  // }
  getCourseList(evt: any) {
    this.course_type = evt.target.value;
    switch (this.course_type) {
      case "Special Training Program":
        this.duration = "90";
        // this.attempt = "3";
        break;
      case "Internship Program":
        this.duration = "90";
        // this.attempt = "1";
        break;
      case "Regular Course":
        this.duration = "60";
        // this.attempt = "1";
        break;
      case "E-Learning Course":
        this.duration = "60";
        // this.attempt = "1";
        break;
      default:
        this.duration = "0";
      // this.attempt = "0";
    }
    this.api
      .get("course", { course_type: this.course_type })
      .subscribe((resp: any) => {
        console.log(resp);
        this.courseList = resp.data;
      });
  }
  getBatch(evt: any) {
    this.course_name = evt.target.value;
    const data = {
      course_type: this.course_type,
      course_name: this.course_name,
      order_by: "created_at",
      order_in: "desc",
    };
    this.api.get("batch", data).subscribe((resp: any) => {
      this.batchList = resp.data;
      console.log(this.batchList);
    });
  }

  checkDate(dateValue: any) {
    // const todaysDate =new Date;
    // const selectedDate= new Date(dateValue)
    // todaysDate.setDate(todaysDate.getDate()+ 2);
    // if(todaysDate > selectedDate ){
    //   alert('Please select a date which is 3 days later from today!');
    // }
  }
  submit(frm: any) {
    console.log(frm.form.value);
    if (frm.form.invalid) {
      alert("Please fill all form values");
    } else {
      // const newDate = frm.form.value.exam_date;
      // +`T`+frm.form.value.exam_time+`:00.000Z`
      // const newTime = frm.form.value.exam_time;
      const targetDate = new Date(frm.form.value.exam_date);
      // console.log(targetDate);
      let todaysDate = new Date();
      // if(targetDate < todaysDate){
      //   alert('Please enter a date in future');
      // }
      //  frm.form..exavaluem_date = newDate;
      console.log(frm.form.value);
      this.api.post("exam", frm.form.value).subscribe((resp: any) => {
        if (resp) {
          alert(resp.message);
          this.router.navigate(["/exam/exam-list"]);
        } else {
          alert(resp.message);
        }
        // console.log(resp);
      });
    }
  }
}
