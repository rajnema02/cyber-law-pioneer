import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoreApiService } from 'src/app/services/core-api.service';
import { FileService } from 'src/app/services/file.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-audit-exam',
  templateUrl: './audit-exam.component.html',
  styleUrls: ['./audit-exam.component.scss']
})
export class AuditExamComponent implements OnInit {
  env: { production: boolean; url: string };
  user_name: any;
  user_image: any;
  examId: any;
  exam: any;
  examName: any;
  endTime: Date;
  intervals: (NodeJS.Timer | number)[] = [];
  end_time: Date;
  dif: number;
  timer: number;
  course_type: any;
  course_name: any;
  batch_name: any;
  duration: string;
  questionList: any;
  questionCount: any;
  notViewed: any;
  currentQuestion: any;
  userSubmit: boolean = false;
  goBackButton: boolean = true;
  submitFinalExam: boolean = false;
  remainingTime: string;
  file: any;
  userId: any;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fs: FileService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.env = environment;
    this.route.params.subscribe((param: any) => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please Login to perform this exam!!");
        this.router.navigate(["/login"]);
        return;
      }
      let userId = user.id;

      this.api.getById("user", userId).subscribe((resp: any) => {
        if (resp) {
          // console.log(resp);
          this.userId = resp._id
          this.user_name = resp.full_name;
          this.user_image = resp.profile_photo;
        }
      });

      this.examId = param.id;
      // console.log(param);
      if (this.examId) {
        const uId = user.id;

        const data = {
          userId: uId,
          examId: this.examId
        };
        console.log(data);
        this.api.post('auditExam/getExamSubmittedStatus', data).subscribe((resp: any) => {

          console.log(resp);
          if (resp.message == true) {
            // item.exam_status = "Submitted"
            alert("Your Exam has been submitted already ")
            this.router.navigate(["/dashboard"]);
          } else {

            this.getExam();
          }

        });


        // this.getIP();
      }
    });
  }

  ngOnInit(): void {
  }

  //  ngAfterViewInit() {
  //   const pElement = this.el.nativeElement.querySelector('#question p');
  //   console.log("pElement",pElement);

  //   this.renderer.setStyle(pElement, 'font-size', '1.3rem');
  // }
  ngOnDestroy() {
    window.onbeforeunload = null;
    for (const interval of this.intervals) {
      clearInterval(interval as NodeJS.Timeout);
    }
  }
  calculateRemainingTime(): void {
    const now = new Date();
    const remainTimeInSeconds = this.endTime.getTime() - now.getTime()
    const remainTime = new Date(this.endTime.getTime() - now.getTime());
    const hours = String(remainTime.getUTCHours()).padStart(2, "0");
    const minutes = String(remainTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(remainTime.getUTCSeconds()).padStart(2, "0");

    this.remainingTime = `${hours}:${minutes}:${seconds}`;
    // this.timeCheck();
    console.log("this.remainingTime>>>>>>>", this.remainingTime);
    if (remainTimeInSeconds <= 0) {
      // if (hours == "00" && minutes == "00" && seconds == "00") {
      // this.setSubmitout();
      const user = JSON.parse(localStorage.getItem("user"));
      const mobile = { mobile: user.mobile };
      // console.log(mobile);
      for (const interval of this.intervals) {
        clearInterval(interval as NodeJS.Timeout);
      }
      // this.api.get("exam/finalExamSubmit", mobile).subscribe((resp: any) => {
      //   if (resp) {
      //     console.log("Exam Final submit");
      //     this.userSubmit = false;
      //     this.demoExam = false;
      //     this.submitFinalExam = true;
      //     this.router.navigate(["/exam/exam-submit"]);
      //   }
      // });
      // this.authService.logout();
      return;
    }

  }
  startTimer() {
    const intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        if (this.timer % 60 === 0) {
          // Add logic here if needed
        }
      } else {
        // Clear all intervals
        for (const inte of this.intervals) {
          // Type check to ensure inte is a number (for browser environments)
          if (typeof inte === 'number') {
            clearInterval(inte);
          } else {
            clearInterval(inte as NodeJS.Timeout);
          }
        }
        this.userSubmit = true;
        this.goBackButton = false;
      }
    }, 1000);

    // Store the interval ID so it can be cleared later
    this.intervals.push(intervalId);

    setTimeout(() => {
      // Additional logic here
    }, 1000);
  }


  getExam() {
    this.api.getById("auditExam", this.examId).subscribe((resp) => {
      this.exam = resp;
      console.log("this.examName", this.exam)

      this.examName = resp.exam_name;
      // const pattern =new RegExp('Demo', "i");
      // console.log(pattern);
      // const matches = this.examName.match(/Demo/g);
      const now = new Date();
      // console.log(matches);
      console.log("EXAMM___NOW---TTIME>>>", now);

      const examEndTime = now.getMinutes() + parseInt(resp.exam_duration)
      this.endTime = new Date(examEndTime);
      console.log("EXAMM___---TTIME>>>", now);
      this.endTime.setHours(this.endTime.getHours() - 5); // Add 5 hours for IST
      this.endTime.setMinutes(this.endTime.getMinutes() - 30); // Add 30 minutes for IST


      // Update the timer every second
      this.intervals.push(
        setInterval(() => {
          this.calculateRemainingTime();
        }, 1000));
      // // console.log(resp);

      let examTime = resp.exam_time;
      const currentTime = Date.now();

      // console.log(examTime);
      let start_time = new Date(resp.exam_date);
      let current_time = new Date();
      this.end_time = new Date(examEndTime);
      console.log("EXAM END TIME++++@+@+@+", this.end_time);
      // start_time.setHours(resp.exam_time.split(":")[0]);
      // start_time.setMinutes(resp.exam_time.split(":")[1]);
      // if (resp.course_type == "Training") {

      // } else if (resp.course_type == "Regular") {
      // this.end_time.setHours(start_time.getHours() + 1);
      // console.log(this.end_time);
      // }
      // this.end_time.setHours(start_time.getHours() + 1);
      // this.end_time.setMinutes(start_time.getMinutes() + 30);
      // this.end_time.setHours(start_time.getHours() );
      // this.end_time.setMinutes(start_time.getMinutes() + 5);
      // console.log(this.end_time);

      this.dif = this.end_time.getTime() - current_time.getTime();
      var Seconds_from_T1_to_T2 = this.dif / 1000;
      var timeDifference = Math.abs(Seconds_from_T1_to_T2);
      // console.log(timeDifference);
      this.timer = timeDifference;
      console.log("======>>>>", this.dif);
      //       if(this.dif > 0) {
      //         console.log("======EXAM OVER========");
      //         this.router.navigate(["/dashboard"]);
      // }
      this.course_type = resp.course_type;
      this.course_name = resp.course_name;
      this.batch_name = resp.batch_name;

      this.getQuestions();
      // console.log(this.course_name);
    });
  }
  getQuestions() {
    //     if(this.dif > 0) {
    //       console.log("======EXAM OVER========");
    //       this.router.navigate(["/dashboard"]);
    // }
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;
    const query = {
      course_type: this.course_type,
      course_name: this.course_name,
      user_id: user.id,
      exam_id: this.examId,
    };
    console.log("QUESTION QUERY >>", query);

    this.api.get("auditExam/getQuestions", query).subscribe((resp) => {
      this.questionList = resp.data
      // .map((o) => {
      //   o.selectedAnswer = o.userAnswer;
      //   return o;
      // });
      console.log("Questions to display>>>>>>>", resp);
      if (resp.message == "New questions") {
        // this.saveQuestionsInitially();
        console.log(".saveQuestionsInitiallySTOOPED");
      }
      // this.startTimer();

      this.questionCount = this.questionList.length;
      this.currentQuestion = this.questionList[0];
      this.notViewed = this.questionCount;
    });
  }

  setUserEvidence(e: any, item: any) {

    if (e.target.files.length) {
      this.file = e.target.files[0];
      // console.log("Image File",this.MapimageFile);
      // this.payment_2();
    } else {
      this.file = null;
    }

    if (this.file) {
      this.fs.uploadFile(this.file).subscribe((res: any) => {
        if (res.type == HttpEventType.Response) {
          const body: any = res.body;
          item.userEvidence = body.file.path;

          // alert('File Uploaded Successfully');
        }
      });
    } else {
      alert('Select File to upload');
    }

    // console.log('evt', evt);
  }

  setUserAnswer(evt: any, item: any) {
    console.log("setUserAnswer item", item);

    console.log('evtsetUserAnswer', item.userAnswer);
    item.userAnswer = evt.target.selectedOptions[0].value;
    item.status = "answered"
    item.seen = true
  }

  setUserDescription(evt: any, item: any) {
    console.log('evt', evt.target.value);
    item.adminSuggestion = evt.target.value;
  }



  examSubmit(frm: NgForm) {
    console.log("fromr>>>>", frm)
    console.log("examSubmit>>>>", this.questionList)
    const queryData = {
      answerSheet: this.questionList,
      examId: this.examId,
      userId: this.userId
    }
    this.api.post("auditExam/syncAnswer", queryData).subscribe((resp: any) => {
      if (resp.success) {
        this.userSubmit = true;

      }
    })

  }

  submit() {
    this.userSubmit = true;
  }

  goBack() {
    this.userSubmit = false;
    // this.demoExam = false;
  }

  logout() {
    this.authService.logout();
  }
  backToHome() {
    const user = JSON.parse(localStorage.getItem("user"));
    const mobile = { mobile: user.mobile };
    // console.log(mobile);

    this.api.get("exam/finalExamSubmit", mobile).subscribe((resp: any) => {
      if (resp) {
        console.log("Exam Final submit");
        this.userSubmit = false;
        this.submitFinalExam = true;
        // this.router.navigate(["/exam/exam-submit"]);
      }
    });
  }
  goBackToHome() {
    this.router.navigate(["/dashboard"]);
  }
}
