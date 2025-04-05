import { Component, OnInit } from "@angular/core";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-student-exam-list",
  templateUrl: "./student-exam-list.component.html",
  styleUrls: ["./student-exam-list.component.scss"],
})
export class StudentExamListComponent implements OnInit {
  examList: any;
  updatedExamList: any;
  submittedStatus: any;

  constructor(private api: CoreApiService) {}

  ngOnInit(): void {
    this.getStudentsExamsList();
  }

  saveExamId(id: any){
    sessionStorage.setItem("examId", id);
  }

  getStudentsExamsList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;

    this.api.get(`exam/getRescheduledExams/${uId}`, {}).subscribe((resp: any) => {
      console.log(resp);

      if (resp) {
        this.examList = resp.exams;
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
          let diffBwNowAndExamStart =this.timeDifference( todaysDate,newExamDate);

          console.log(item.exam_name,diffBwNowAndExamStart);



          let examEndTime = new Date(newExamDate.setMinutes(newExamDate.getMinutes() + parseInt(duration, 10)));
          let diffBwNowAndExamEnd = this.timeDifference(todaysDate, examEndTime);
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
          if (
            examDate == todaysDateOnly &&
            examMonth == todaysMonthOnly &&
            examYear == todaysYearOnly
          ) {
            if(diffBwNowAndExamStart > 0) {
              item.exam_status = "Upcoming";
              // console.log("Upcoming")
            }else if(diffBwNowAndExamStart < 0 && diffBwNowAndExamEnd>0){

              item.exam_status = "Ongoing";
              this.getExamSubmittedStatus(item);
              // console.log("Ongoing");
            } else if(diffBwNowAndExamEnd < 0){
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
          // let batchId = item.batch_id[0];

          //   this.api.getById("batch", batchId).subscribe((resp: any) => {
          //     item.batch_name = resp.batch_name;
          //     // console.log(resp);
          //     // item.batch_name.push(resp.batch_name);
          //   });

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
        // this.updatedExamList = this.examList.map((item) => {
        //   let newDate = new Date(item.exam_date);
        //   let examDate = newDate.getDate();
        //   let examMonth = newDate.getMonth();
        //   let examYear = newDate.getFullYear();
        //   // console.log('Exam Date',examDate);
        //   let todaysDate = new Date();
        //   let todaysDateOnly = todaysDate.getDate();
        //   let todaysMonthOnly = todaysDate.getMonth();
        //   let todaysYearOnly = todaysDate.getFullYear();
        //   // console.log('Todays  Date',todaysDateOnly);

        //   let todaysDateHours = todaysDate.getHours();
        //   // console.log('todays hours',todaysDateHours);

        //   let updatedDate = newDate.getDate();
        //   let updatedYear = newDate.getFullYear();
        //   let updatedMonth = newDate.getMonth();
        //   let updatedHours = item.exam_time.split(":")[0];
        //   let updatedMinutes = item.exam_time.split(":")[1];
        //   let examStartHours = +updatedHours;
        //   let endTimeHours = examStartHours + 1;
        //   let newStartTime = new Date();
        //   let newNowTime = new Date();
        //   // console.log('Now time',newNowTime);
        //   let newEndTime = new Date();

        //   newStartTime.setHours(updatedHours);
        //   newStartTime.setMinutes(updatedMinutes);


        //   // let newStartExamTime = newStartTime;
        //   // console.log('newStartTime', newStartExamTime);

        //   // let newET= new Date(newStartTime.setMinutes(newStartTime.getMinutes() + 30));
        //   // console.log('newEndTime', newET);
        //   // if(newStartTime <= (newNowTime && newET) && newNowTime < (newET)){
        //   //   console.log("&&&&&&Entry called");
        //   // }


        //   // console.log('exam start hours',examStartHours);
        //   // console.log('exam end hours',endTimeHours);
        //   if (
        //     examDate == todaysDateOnly &&
        //     examMonth == todaysMonthOnly &&
        //     examYear == todaysYearOnly
        //   ) {
        //     if (
        //       // examStartHours <= todaysDateHours &&
        //       // todaysDateHours <= endTimeHours


        //       newStartTime <= (newNowTime) &&  newNowTime < new Date(newStartTime.setMinutes(newStartTime.getMinutes() + 30))

        //     ) {
        //         item.exam_status = "Ongoing"
        //     this.getExamSubmittedStatus(item);


        //     }else if(newNowTime < newStartTime){
        //       item.exam_status = "Upcoming"
        //     }else if(newNowTime > new Date(newStartTime.setMinutes(newStartTime.getMinutes() + 30))){
        //       console.log(newStartTime);

        //       item.exam_status = "Done"
        //     this.getExamSubmittedStatus(item);

        //     }
        //     //    if( newNowTime <  newET && newNowTime > newStartTime){
        //     //   }else if(newStartTime > newNowTime) {
        //     //     console.log('&&&&',newStartExamTime);
        //     //     console.log(newNowTime);
        //     //     item.exam_status = "Upcoming";
        //     //     // this.getExamSubmittedStatus(item);
        //     //   }


        //     // } else if (newNowTime > newET) {
        //     //   // console.log('Done Today called')
        //     //   item.exam_status = "Done";
        //     //   this.getExamSubmittedStatus(item);

        //     // }
        //   } else if (examDate < todaysDateOnly) {
        //     item.exam_status = "Done";
        //     this.getExamSubmittedStatus(item);

        //   } else if (examDate > todaysDateOnly) {
        //     item.exam_status ="Upcoming"
        //   }

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

        //   item.exam_time = updatedHours + ":" + updatedMinutes;
        //   return item;
        // });
      } else {
        alert(resp.message);
      }
    });


  }

  getExamSubmittedStatus(item){
    console.log(item);
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;

      const data = {
        userId :uId,
        examId: item._id
      };
      console.log(data);
      this.api.post('exam/getExamSubmittedStatus', data ).subscribe((resp: any)=>{

        console.log(resp);
        if(resp.message == true){
          item.exam_status = "Submitted"
        }

      });
      return item;

    }

    timeDifference(date1: Date, date2: Date){
      let timeInSeconds1 = date1.getTime();
      let timeInSeconds2 = date2.getTime();
      console.log('higherValue', timeInSeconds2);
      console.log('lowerValue', timeInSeconds1);
      let timeDifference = timeInSeconds2 - timeInSeconds1;
      return timeDifference;


    }

    timeInSeconds(date: Date){
      let timeInSeconds = date.getTime();
      console.log('from single function', timeInSeconds);
      return timeInSeconds;
    }


}
