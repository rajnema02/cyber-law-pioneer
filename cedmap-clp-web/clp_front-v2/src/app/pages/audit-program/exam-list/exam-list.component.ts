import { Component, OnInit } from '@angular/core';
import { CoreApiService } from 'src/app/services/core-api.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  examList: any;
  updatedExamList: any;
  oldUpdatedExamList: any;
  batchNames: any = [];
  timeDiff: any;

  constructor(private api: CoreApiService) {}

  ngOnInit(): void {
    this.getExamsList();
  }

  getExamsList() {
    this.api.get("auditExam/getList", {}).subscribe((resp: any) => {
      this.examList = resp.data;
      console.log(resp.data);

      this.updatedExamList = this.examList.map((item) => {
        let newExamDateFrom = new Date(item.exam_date_from);
        let examStartHours = item.exam_time?.split(":")[0];
        let examStartMinutes = item.exam_time?.split(":")[1];
        // newExamDateFrom.setHours(examStartHours);
        // newExamDateFrom.setMinutes(examStartMinutes);
        // let examStartTime = this.timeInSeconds(newExamDateFrom);
        let examDate = newExamDateFrom.getDate();
        let examMonth = newExamDateFrom.getMonth();
        let examYear = newExamDateFrom.getFullYear();

        let todaysDate = new Date();
        let todaysDateOnly = todaysDate.getDate();
        let todaysMonthOnly = todaysDate.getMonth();
        let todaysYearOnly = todaysDate.getFullYear();
        // console.log('Exam Date',newDate);
        // console.log('Today Date',todaysDate);
        // console.log('Todays  Date',todaysDateOnly);

        let todaysDateHours = todaysDate.getHours();
        let todaysDateMinutes = todaysDate.getMinutes();
        // console.log('todays hours',todaysDateHours);
        // console.log('todays Miutes',todaysDateMinutes);

        // let updatedDate = newDate.getDate();
        // let updatedYear = newDate.getFullYear();
        // let updatedMonth = newDate.getMonth();
        let duration = item.exam_duration;
        // console.log('Exam Start Time#######3', newExamDate);
        // this.timeInSeconds(newExamDate);
        let diffBwNowAndExamStart = this.timeDifference(
          todaysDate,
          newExamDateFrom
        );
        let newExamDateTo = new Date(item.exam_date_to);

        // let examEndTime = new Date(
        //   newExamDate.setMinutes(
        //     newExamDate.getMinutes() + parseInt(duration, 10)
        //   )
        // );
        let examEndTime = newExamDateTo.setHours(23, 59, 59);
        let diffBwNowAndExamEnd = this.timeDifference(
          new Date(todaysDate),
          new Date(examEndTime)
        );
        console.log("Today Time>>>>>", new Date(todaysDate));
        console.log("examEndTime Time>>>>>", new Date(examEndTime));
        this.timeDiff = diffBwNowAndExamEnd;
        console.log("<<*******EXAM START*********>>",item.exam_name,diffBwNowAndExamStart);
        console.log("<<#######EXAM END#######>>", item.exam_name, diffBwNowAndExamEnd);
        // let endTime =this.timeInSeconds(examEndTime);
        // let nowTime = this.timeInSeconds(todaysDate)
        // console.log('Start Time',examStartTime);
        // console.log('End Time', endTime);
        // console.log("Now Time", nowTime);

        // console.log('Exam End Time>>>>>>>>', examEndTime);
        // let updatedHours = item.exam_time?.split(":")[0];
        // let updatedMinutes = item.exam_time?.split(":")[1];
        // let examStartMinutes = +updatedMinutes;
        // let endTimeMinutes = examStartMinutes + 30;
        // let examStartHours = +updatedHours;
        // let endTimeHours = examStartHours + 1;
        // console.log("exam start hours", examStartHours);
        // console.log("exam start Minutes", examStartMinutes);
        // console.log("exam end hours", endTimeHours);
        // console.log("exam end Minutes", endTimeMinutes);

        // console.log(item);

        // // let updatedMinutes = item.exam_time.split(":")[1];
        // console.log("diffBwNowAndExamStart",)
        // console.log("Upcoming")
        if (
          examDate && todaysDateOnly &&
          examMonth && todaysMonthOnly &&
          examYear && todaysYearOnly
        ) {
          if(diffBwNowAndExamStart > 0 && diffBwNowAndExamEnd > 0) {
            item.exam_status = "Upcoming";
          }else if(diffBwNowAndExamStart <= 0 && diffBwNowAndExamEnd>=0){

             item.exam_status = "Ongoing";
            // console.log("Ongoing");
          } else if(diffBwNowAndExamEnd < 0 && diffBwNowAndExamStart < 0){
             item.exam_status = "Exam Over";

          }
        }

        //   // console.log('Equal called');
        //   if (
        //     examStartHours <= todaysDateHours &&
        //     todaysDateHours <= endTimeHours
        //   ) {
        //     item.exam_status = "Ongoing";
        //   } else if (
        //     todaysDateHours > endTimeHours

        //   ) {
        //     item.exam_status = "Done";
        //     if (updatedMinutes <= endTimeMinutes) {
        //       // console.log('Done Today called')
        //       item.exam_status = "Done";

        //     }
        //   }
        // } else if (examDate < todaysDateOnly) {
        //   item.exam_status = "Done";
        // }
        // item.batch_name = [];
        let batchId = item.batch_id[0];

        this.api.getById("batch", batchId).subscribe((resp: any) => {
          item.batch_name = resp.batch_name;
          // console.log(resp);
          // item.batch_name.push(resp.batch_name);
        });

         return item;
      });

    });
  }

  getExamSubmittedStatus() {}

  getBatchNames(batchIdArray) {
    for (let bt of batchIdArray) {
      this.api.getById("batch", bt).subscribe((resp: any) => {
        // console.log(resp);

        this.batchNames.push(resp.batch_name);
      });
    }
    console.log(this.batchNames);
  }

  timeDifference(date1: Date, date2: Date) {
    let timeInSeconds1 = date1.getTime()
    let timeInSeconds2 = date2.getTime()
    // let timeInSeconds1 = date1.getDate();
    // let timeInSeconds2 = date2.getDate();
    console.log('higherValue', timeInSeconds2);
    console.log('lowerValue', timeInSeconds1);
    let timeDiff = timeInSeconds2 - timeInSeconds1;
    // console.log("timeDiff",timeDiff);
    return timeDiff;
  }

  timeInSeconds(date: Date) {
    let timeInSeconds = date.getTime();
    // console.log('from single function', timeInSeconds);
    return timeInSeconds;
  }
}

