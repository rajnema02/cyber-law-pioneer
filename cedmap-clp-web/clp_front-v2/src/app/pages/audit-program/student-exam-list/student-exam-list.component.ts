import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-student-exam-list',
  templateUrl: './student-exam-list.component.html',
  styleUrls: ['./student-exam-list.component.scss']
})
export class StudentExamListComponent implements OnInit {

  examList: any;
  updatedExamList: any;
  submittedStatus: any;
  env: { production: boolean; url: string; };

  constructor(private api: CoreApiService) {
    this.env = environment
  }

  ngOnInit(): void {
    this.getStudentsExamsList();
  }

  saveExamId(id: any) {
    sessionStorage.setItem("examId", id);
  }

  getStudentsExamsList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;

    // this.api.get(`auditExam/getRescheduledExams/${uId}`, {}).subscribe((resp: any) => {
    this.api.get(`auditExam/getStudentExams/${uId}`, {}).subscribe((resp: any) => {
      console.log(resp);

      if (resp) {
        this.examList = resp.exams;
        this.updatedExamList = this.examList.map((item) => {
          let newExamDateFrom = new Date(item.exam_date_from);
          newExamDateFrom.setHours(0, 0, 0)
          let examStartHours = item.exam_time?.split(":")[0];
          let examStartMinutes = item.exam_time?.split(":")[1];
          let examDate = newExamDateFrom.getDate();
          let examMonth = newExamDateFrom.getMonth();
          let examYear = newExamDateFrom.getFullYear();

          let todaysDate = new Date();

          // console.log(item.exam_name,diffBwNowAndExamStart);
          console.log("exam_date_to", item.exam_date_to);
          let newExamDateTo = new Date(item.exam_date_to);
          // newExamDateTo.setHours(23, 59, 59)

          // let examEndTime = new Date(newExamDateTo.setMinutes(newExamDateTo.getMinutes() + parseInt(duration, 10)));
          // let examEndTime = newExamDateTo.setHours(23, 59, 59)
          let diffBwNowAndExamStart = this.timeDifference(todaysDate, newExamDateFrom);
          let diffBwNowAndExamEnd = this.timeDifference(todaysDate, newExamDateTo);

          console.log("examEndTimediffBwNowAndExam>>>>Start<<<", diffBwNowAndExamStart);
          console.log("examEndTimediffBwNowAndExam>>>>End<<<", diffBwNowAndExamEnd);

          // Check the status of the exam based on the date differences
          if (diffBwNowAndExamStart > 0 && diffBwNowAndExamEnd > 0) {
            // Exam is upcoming
            console.log("Exam is upcoming");

            item.exam_status = "Upcoming";
          } else if (diffBwNowAndExamStart <= 0 && diffBwNowAndExamEnd > 0) {
            // Exam is ongoing
            console.log("Exam is ongoing");

            item.exam_status = "Ongoing";
            this.getExamSubmittedStatus(item);
          } else if (diffBwNowAndExamStart < 0 && diffBwNowAndExamEnd < 0) {
            // Exam is over
            console.log("Exam is over");

            this.getExamSubmittedStatus(item);
            console.log("getExamSubmittedStatus>>", item.exam_status);
            if (item.exam_status !== "Ongoing") {
              item.exam_status = "Exam Over";
            }
          }

          return item;
        });

      } else {
        alert(resp.message);
      }
    });


  }

  getExamSubmittedStatus(item: any) {
    // console.log(item);
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;

    const data = {
      userId: uId,
      examId: item._id
    };
    // console.log(data);
    this.api.post('auditExam/getExamSubmittedStatus', data).subscribe((resp: any) => {

      console.log("getExamSubmittedStatus", resp);
      if (resp.message == true) {
        item.exam_status = "Submitted"
      }
      item.report = resp.data?.reportPath ? resp.data?.reportPath : false
      item.reportStatus = resp?.data?.reportStatus ? resp.data?.reportStatus : false
      if (item.parent_exam) {
        const data = {
          userId: uId,
          examId: item.parent_exam
        };
        console.log("CHILD EXAM >>>>>", item);
        this.api.post('auditExam/getExamSubmittedStatus', data).subscribe((childResp: any) => {

          console.log("getExamSubmittedStatus of PARENT EXAM", resp);
          if (resp.message == true && resp.data.reportPath && !childResp.data.reportPath) {
            item.exam_status = "Ongoing"
          }
          if (resp.message == true && !resp.data.reportPath) {
            item.exam_status = "Upcoming"
          }
          if (resp.message == false) {
            item.exam_status = "Upcoming"
          }
        });
      }
    });
    console.log("returning item ", item);

    return item;
  }

  timeDifference(date1: Date, date2: Date): number {
    let timeInSeconds1 = Date.UTC(
      date1.getUTCFullYear(),
      date1.getUTCMonth(),
      date1.getUTCDate(),
      date1.getUTCHours(),
      date1.getUTCMinutes(),
      date1.getUTCSeconds(),
      date1.getUTCMilliseconds()
    );

    let timeInSeconds2 = Date.UTC(
      date2.getUTCFullYear(),
      date2.getUTCMonth(),
      date2.getUTCDate(),
      date2.getUTCHours() - 5,
      date2.getUTCMinutes() - 30,
      date2.getUTCSeconds(),
      date2.getUTCMilliseconds()
    );
    // console.log('Date1 (ms):', date1);
    // console.log('Date2 (ms):', date2);

    // // let timeInSeconds1 = date1.getTime();
    // // let timeInSeconds2 = date2.getTime();

    // console.log('Date1 Time (ms):', timeInSeconds1);
    // console.log('Date2 Time (ms):', timeInSeconds2);

    let timeDifference = timeInSeconds2 - timeInSeconds1;
    return timeDifference;
  }

  timeInSeconds(date: Date) {
    let timeInSeconds = date.getTime();
    console.log('from single function', timeInSeconds);
    return timeInSeconds;
  }


}
