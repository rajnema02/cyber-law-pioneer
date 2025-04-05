import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-exam-list",
  templateUrl: "./exam-list.component.html",
  styleUrls: ["./exam-list.component.scss"],
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
    this.api.get("exam/getList", {}).subscribe((resp: any) => {
      this.examList = resp.data;
      console.log(resp.data);

      this.updatedExamList = this.examList.map((item) => {
        let newExamDate = new Date(item.exam_date);
        let examStartHours = item.exam_time?.split(":")[0];
        let examStartMinutes = item.exam_time?.split(":")[1];
        newExamDate.setHours(examStartHours);
        newExamDate.setMinutes(examStartMinutes);
        // let examStartTime = this.timeInSeconds(newExamDate);
        let examDate = newExamDate.getDate();
        let examMonth = newExamDate.getMonth();
        let examYear = newExamDate.getFullYear();

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
        this.timeInSeconds(newExamDate);
        let diffBwNowAndExamStart = this.timeDifference(
          todaysDate,
          newExamDate
        );

        // console.log(item.exam_name,diffBwNowAndExamStart);

        let examEndTime = new Date(
          newExamDate.setMinutes(
            newExamDate.getMinutes() + parseInt(duration, 10)
          )
        );
        let diffBwNowAndExamEnd = this.timeDifference(
          new Date(todaysDate),
          new Date(examEndTime)
        );
        console.log("Today Time>>>>>", new Date(todaysDate));
        console.log("examEndTime Time>>>>>", new Date(examEndTime));
        this.timeDiff = diffBwNowAndExamEnd;
        console.log("EXAM END", item.exam_name, diffBwNowAndExamEnd);
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
        // if (
        //   examDate == todaysDateOnly &&
        //   examMonth == todaysMonthOnly &&
        //   examYear == todaysYearOnly
        // ) {
          if (diffBwNowAndExamStart > 0) {
            item.exam_status = "Upcoming";
            // console.log("Upcoming")
          } else if (diffBwNowAndExamStart < 0 && diffBwNowAndExamEnd > 0) {
            item.exam_status = "Ongoing";
            // console.log("Ongoing");
          } else if (diffBwNowAndExamEnd < 0) {
            item.exam_status = "Exam Over";
          }
        // }

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

        // // console.log(item)
        // // if (examDate == todaysDateOnly ) {

        // //   console.log('Exam is today');
        // //   if(numberedHours < todaysDateHours){
        // //     item.exam_status = "Done";
        // //   }else if(numberedHours > todaysDateHours){
        // //     item.exam_status = "Upcoming";
        // //   }else if(numberedHours > todaysDateHours && numberedHours < endTimeHours){
        // //     item.exam_status = "Ongoing";
        // //   }
        // // } else if (newDate > todaysDate ) {
        // //   item.exam_status = "Upcoming";
        // // }else if(newDate < todaysDate) {
        // //   item.exam_status ="Done";
        // // }

        // // item.exam_date = updatedYear + "-" + updatedMonth + "-" + updatedDate;

        // // item.exam_time = updatedHours + ":" + updatedMinutes;
        return item;
      });
      // this.oldUpdatedExamList = this.examList.map((item) => {
      //   let newDate = new Date(item.exam_date);
      //   let examDate = newDate.getDate();
      //   let examMonth = newDate.getMonth();
      //   let examYear = newDate.getFullYear();

      //   let todaysDate = new Date();
      //   let todaysDateOnly = todaysDate.getDate();
      //   let todaysMonthOnly = todaysDate.getMonth();
      //   let todaysYearOnly = todaysDate.getFullYear();
      //   // console.log('Exam Date',newDate);
      //   // console.log('Today Date',todaysDate);
      //   // console.log('Todays  Date',todaysDateOnly);

      //   let todaysDateHours = todaysDate.getHours();
      //   let todaysDateMinutes = todaysDate.getMinutes();
      //   // console.log('todays hours',todaysDateHours);
      //   // console.log('todays Miutes',todaysDateMinutes);

      //   let updatedDate = newDate.getDate();
      //   let updatedYear = newDate.getFullYear();
      //   let updatedMonth = newDate.getMonth();
      //   let updatedHours = item.exam_time?.split(":")[0];
      //   let updatedMinutes = item.exam_time?.split(":")[1];
      //   let examStartMinutes = +updatedMinutes;
      //   let endTimeMinutes = examStartMinutes + 30;
      //   let examStartHours = +updatedHours;
      //   let endTimeHours = examStartHours + 1;
      //   // console.log("exam start hours", examStartHours);
      //   // console.log("exam start Minutes", examStartMinutes);
      //   // console.log("exam end hours", endTimeHours);
      //   // console.log("exam end Minutes", endTimeMinutes);

      //   // let updatedMinutes = item.exam_time.split(":")[1];
      //   if (
      //     examDate == todaysDateOnly &&
      //     examMonth == todaysMonthOnly &&
      //     examYear == todaysYearOnly
      //   ) {
      //     // console.log('Equal called');
      //     if (
      //       examStartHours <= todaysDateHours &&
      //       todaysDateHours <= endTimeHours
      //     ) {
      //       item.exam_status = "Ongoing";
      //     } else if (
      //       todaysDateHours > endTimeHours

      //     ) {
      //       item.exam_status = "Done";
      //       if (updatedMinutes <= endTimeMinutes) {
      //         // console.log('Done Today called')
      //         item.exam_status = "Done";

      //       }
      //     }
      //   } else if (examDate < todaysDateOnly) {
      //     item.exam_status = "Done";
      //   }
      //   item.batch_name = [];
      //   for (let bId of item.batch_id) {
      //     this.api.getById("batch", bId).subscribe((resp: any) => {
      //       // console.log(resp);
      //       item.batch_name.push(resp.batch_name);
      //     });
      //   }
      //   // console.log(item)
      //   // if (examDate == todaysDateOnly ) {

      //   //   console.log('Exam is today');
      //   //   if(numberedHours < todaysDateHours){
      //   //     item.exam_status = "Done";
      //   //   }else if(numberedHours > todaysDateHours){
      //   //     item.exam_status = "Upcoming";
      //   //   }else if(numberedHours > todaysDateHours && numberedHours < endTimeHours){
      //   //     item.exam_status = "Ongoing";
      //   //   }
      //   // } else if (newDate > todaysDate ) {
      //   //   item.exam_status = "Upcoming";
      //   // }else if(newDate < todaysDate) {
      //   //   item.exam_status ="Done";
      //   // }

      //   // item.exam_date = updatedYear + "-" + updatedMonth + "-" + updatedDate;

      //   // item.exam_time = updatedHours + ":" + updatedMinutes;
      //   return item;
      // });
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
    let timeInSeconds1 = date1.getTime();
    let timeInSeconds2 = date2.getTime();
    // console.log('higherValue', timeInSeconds2);
    // console.log('lowerValue', timeInSeconds1);
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
