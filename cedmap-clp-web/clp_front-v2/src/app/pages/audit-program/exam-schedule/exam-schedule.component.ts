import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})
export class ExamScheduleComponent implements OnInit {
  batchList: any;
  courseList: any;
  course_type: any;
  course_name: any;
  batch_id: any = [];
  duration: any = "--";
  isAuditExam: Boolean = true

  constructor(
    private api: CoreApiService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  // getBatches(){
  //   this.api.get("batch",{}).subscribe((resp: any)=>{
  //     this.batchList = resp.data;
  //     console.log(this.batchList);
  //   })
  // }
  getCourseList(evt: any) {
    this.course_type = evt.target.value;
    switch (this.course_type) {
      case "Training program for Govt Organisation":
        this.duration = "90";
        // this.attempt = "3";
        break;
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
      isAuditExam: this.isAuditExam,
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

   checkDate(dateValue, item) {
    if (item === 'from') {
        dateValue += 'T00:00:00.000Z';
        return dateValue
    } else if (item === 'to') {
        dateValue += 'T23:59:59.000Z';
        return dateValue
    }

    const selectedDate = new Date(dateValue);
    console.log("selectedDate >>>>>", selectedDate);


    // todaysDate.setDate(todaysDate.getDate()+ 2);
    // if(todaysDate > selectedDate ){
    //   alert('Please select a date which is 3 days later from today!');
    // }
  }
  submit(frm: any) {
    // console.log(frm.form.value);
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
      this.api.post("auditExam", frm.form.value).subscribe((resp: any) => {
        if (resp) {
          alert(resp.message);
          this.router.navigate(["/audit/exam-list"]);
        } else {
          alert(resp.message);
        }
        // console.log(resp);
      });
    }
  }
}
