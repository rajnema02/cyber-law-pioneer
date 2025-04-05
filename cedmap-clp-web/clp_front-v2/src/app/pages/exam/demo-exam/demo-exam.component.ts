import { Component, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { json } from "stream/consumers";
import { AuthService } from "src/app/services/auth.service";
import { Subscription, interval } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { IpAddressService } from "src/app/services/ip-address.service";
import { ConfirmationGuardService } from "src/app/services/confirmation-guard.service";
import { environment } from "src/environments/environment";
declare const window: any;
@Component({
  selector: "app-demo-exam",
  templateUrl: "./demo-exam.component.html",
  styleUrls: ["./demo-exam.component.scss"],
})
export class DemoExamComponent implements OnInit {
  submitFinalExam: boolean = false;
  gobackhide: boolean= true;
  @HostListener("window:beforeunload", ["$event"])
  unloadHandler(event: Event) {
    window.opener.location.reload();
  }

  examId: any;
  examName: any;

  course_type: any;
  course_name: any;
  questionList: any;
  duration: any;
  batch_name: any;
  selectedOption: any;
  answerList: any;
  attemptedQuestions: any = [];
  currentQuestion: any;
  globalIndex: any = 1;
  questionCount: any;
  intervals = [];
  goBackButton: Boolean = true;
  user_name: any;
  user_image: any;
  env: { production: boolean; url: string };

  notViewed: any = 0;
  viewed: any = 0;
  answered: any = 0;
  userSubmit: Boolean = false;
  end_time: Date;
  timer = 3650;
  ipAddress: string;

  endTime: Date;
  remainingTime: string;
  demoExam: Boolean = false;

  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private ip: IpAddressService,
    private confirmationGuard: ConfirmationGuardService
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
          console.log(resp);
          this.user_name = resp.full_name;
          this.user_image = resp.profile_photo;
          this.getExam();
        }
      });
    });
  }

  ngOnInit(): void {}

  calculateRemainingTime(): void {
    const present = new Date();
    // const now = new Date();

    // const endTime =new Date(now.setMinutes(now.getMinutes()+ 30)) ;

    // // const endTime = new Date(now.setMinutes(now.getMinutes() + 30));
    // console.log(endTime);
    // console.log(endTime.getTime());
    // console.log(present.getTime());
    const remainingTime =new Date(this.endTime.getTime() - present.getTime());


    const hours = String(remainingTime.getUTCHours()).padStart(2, "0");
    const minutes = String(remainingTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(remainingTime.getUTCSeconds()).padStart(2, "0");

    this.remainingTime = `${hours}:${minutes}:${seconds}`;
    if (hours == "00"  && minutes == "00" && seconds == "00") {
      this.setSubmitout();
      // this.authService.logout();
      console.log(this.remainingTime);
      return;
    }
  }

  ngOnDestroy() {
    window.onbeforeunload = null;
  }

  // getIP() {
  //   console.log('IP Address function called');
  //   this.ip.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip;
  //     console.log(this.ipAddress);
  //   });
  // }
  getExam() {
    const nowTime = new Date();
    const present = new Date();
    // nowTime.setMinutes(nowTime.getMinutes() + 20);
    this.endTime = new Date(nowTime);
    this.endTime = new Date(this.endTime.getTime()+  20 * 60 * 1000);
    // this.endTime = new Date(this.endTime.getTime()+  1 * 60 * 1000);
    console.log(present.getTime());
    console.log(this.endTime.getTime());

    // this.endTime.setHours(this.endTime.getHours() - 5); // Add 5 hours for IST
    // this.endTime.setMinutes(this.endTime.getMinutes() - 30); // Add 30 minutes for IST
    // Update the timer every second
    setInterval(() => {
      this.calculateRemainingTime();
    }, 1000);
    // console.log(resp);

    // let examTime = resp.exam_time;
    // const currentTime = Date.now();

    // console.log(examTime);

    let start_time = new Date();
    let current_time = new Date();
    // this.end_time = new Date();

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

    // var dif = this.end_time.getTime() - current_time.getTime();
    // var Seconds_from_T1_to_T2 = dif / 1000;
    // var timeDifference = Math.abs(Seconds_from_T1_to_T2);
    // console.log(timeDifference);
    // this.timer = timeDifference;

    this.course_type = "General";

    // if (this.course_type == "Regular") {
    //   this.duration = "60 Mins.";

    // } else {

    // }
    this.duration = "20 Mins.";
    this.getQuestions();

    // this.api.getById("exam", this.examId).subscribe((resp) => {
    //   // const pattern =new RegExp('Demo', "i");
    //   // console.log(pattern);
    //   // console.log(this.examName)
    //   const matches = this.examName.match(/Demo/g);

    //   // console.log(matches);

    //   // console.log(this.course_name);
    // });
  }
  getQuestions() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;

    this.api.get("exam/getDemoQuestions",{}).subscribe((resp) => {
      console.log(resp);
      this.questionList = resp;
      console.log("Questions to display>>>>>>>", this.questionList);

      this.startTimer();

      this.questionCount = 20;
      this.currentQuestion = this.questionList[0];
      this.notViewed = this.questionCount;
    });
  }
  getQuestionIndex() {
    var currentIndex = -1; // Default value if currentQues is not found
    for (var i = 0; i < this.questionList?.length; i++) {
      if (this.questionList[i]._id === this.currentQuestion._id) {
        currentIndex = i;
        break;
      }
    }

    return currentIndex + 1;
  }
  isSelected(opt: any) {
    // console.log("IS SELECTED",opt);

    if (this.currentQuestion?.selectedAnswer == null) {
      return false;
    } else if (this.currentQuestion.selectedAnswer == opt) {
      return true;
    }
  }

  saveAnswer(opt: any) {
    if (this.currentQuestion.status == "unanswered") {
      this.currentQuestion.selectedAnswer = opt;
      this.currentQuestion.seen = true;
      this.currentQuestion.status = "answered";
      this.answered = this.answered + 1;
      // this.studentsAttemptedQuestions.push(this.currentQuestion);
    } else if (
      this.currentQuestion.status == "answered" &&
      this.currentQuestion.selectedAnswer == opt
    ) {
      this.currentQuestion.selectedAnswer = null;
      this.currentQuestion.status = "unanswered";
      this.currentQuestion.seen = true;

      this.answered = this.answered - 1;
    } else if (
      this.currentQuestion.status == "answered" &&
      this.currentQuestion.selectedAnswer != opt
    ) {
      this.currentQuestion.selectedAnswer = opt;
      this.currentQuestion.seen = true;
    }
    // console.log(this.currentQuestion);
    this.isSelected(opt);
    // this.logAnswer();
  }

  previousQuestion() {
    let currentIndex = this.questionList.indexOf(this.currentQuestion);
    let newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      this.currentQuestion = this.questionList[newIndex];
      this.globalIndex = this.globalIndex - 1;
    }
  }

  submitAndNext() {
    if (this.attemptedQuestions.indexOf(this.currentQuestion) == -1) {
      this.attemptedQuestions.push(this.currentQuestion);
      console.log(this.currentQuestion);
      // this.logAnswer();
    }
    this.nextQuestion();
    // this.logAnswer();
    // console.log(this.attemptedQuestions);
  }
  nextQuestion() {
    if (this.viewed + 1 == this.globalIndex) {
      this.viewed = this.viewed + 1;
      this.notViewed = this.notViewed - 1;
    }
    this.currentQuestion.seen = true;
    let currentIndex = this.questionList.indexOf(this.currentQuestion);
    let newIndex = currentIndex + 1;
    if (newIndex < this.questionCount) {
      this.globalIndex = this.globalIndex + 1;
      this.currentQuestion = this.questionList[newIndex];
    }
  }

  // Timer Code

  getTimer() {
    const hours: any = this.timer / (60 * 60);
    const minutes: any = this.timer / 60 - parseInt(hours, 10) * 60;
    const seconds: any =
      this.timer - parseInt(minutes, 10) * 60 - parseInt(hours, 10) * 60 * 60;
    return `${parseInt(hours, 10)}h : ${parseInt(minutes, 10)}m : ${parseInt(
      seconds,
      10
    )}s`;
  }

  startTimer() {
    this.intervals.push(
      setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          if (this.timer % 60) {
          }
        } else {
          alert(
            "Stop! Your Exam is over. Further Instructions will be sent to you ."
          );
          for (const inte of this.intervals) {
            clearInterval(inte);
          }
          this.submit();
          this.goBackButton = false;
          // this.examSubmit = true;
        }
      }, 1000)
    );
    // this.intervals.push(
    setTimeout(() => {
      // this.setFace();
    }, 1000);
    // );
    this.intervals.push(
      setInterval(() => {
        // this.WarnUser();
      }, 4000)
    );
  }

  setSubmitout() {
    confirm("Timeout! Your exam has been submitted successfully.");
    this.gobackhide= false
    this.submit();
  }
  submit() {
    // const pattern = new RegExp("Demo", "i");
    // const matches = this.examName.match(pattern);

    // console.log(matches);
    // if (matches == null) {
    this.userSubmit = true;
    // } else {
    //   this.demoExam = true;
    // }
  }
  goBack() {
    this.userSubmit = false;
    this.demoExam = false;
  }

  logout() {
    this.authService.logout();
  }
  backToHome() {
    this.userSubmit = false;
    this.demoExam = false;
    this.submitFinalExam = true;
  }
  goBackToHome() {
    this.router.navigate(["/dashboard"]);
  }
}
