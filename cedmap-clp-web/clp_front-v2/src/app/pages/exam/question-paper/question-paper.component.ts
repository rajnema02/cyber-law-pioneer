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
// import { clearInterval } from "timers";
declare const window: any;

@Component({
  selector: "app-question-paper",
  templateUrl: "./question-paper.component.html",
  styleUrls: ["./question-paper.component.scss"],
})
export class QuestionPaperComponent implements OnInit {
  submitFinalExam: boolean = false;
  dif: number;
  @HostListener("window:beforeunload", ["$event"])
  unloadHandler(event: Event) {
    window.opener.location.reload();
  }
  // @HostListener('window:beforeunload', ['$event'])
  // handleRefresh(event: Event): any {
  //   // Display a confirmation dialog to the user
  //   const confirmationMessage = 'Are you sure you want to refresh the page?';

  //   // Cancel the refresh event if the user chooses to stay on the page
  //   event.returnValue = true;
  //   return confirmationMessage;
  // }

  exam: any;
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
  timer: any;
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
          // console.log(resp);
          this.user_name = resp.full_name;
          this.user_image = resp.profile_photo;
        }
      });

      this.examId = param.id;
      // console.log(param);
      if (this.examId) {
        this.getExam();
        // this.getIP();
      }
    });
    // this.timeCheck();
  }

  ngOnInit(): void {
    this.logAnswer();
    // this.timeCheck();
    // this.fetchResponededAnswer();
    // Fetch the exam details and end time from the backend
    //   this.http.get<any>("/api/exam").subscribe(
    //     (response) => {
    //       this.endTime = new Date(response.endTime);

    //       // Update the timer every second
    //       setInterval(() => {
    //         this.calculateRemainingTime();
    //       }, 1000);
    //     },
    //     (error) => {
    //       console.error("Error fetching exam details:", error);
    //     }
    //   );
  }
  fetchResponededAnswer() {
    let user = JSON.parse(localStorage.getItem("user"));
    const data = {
      user_id: user.id,
      user_name: user.full_name,
      exam_id: this.examId,
    };
    this.api.get("activityLog", data).subscribe((resp: any) => {
      console.log(resp);
      for (const response of resp) {
        const question = this.questionList.find(
          (q: any) => q._id === response.questionId
        );
        if (question) {
          question.answer = response.answer;
        }
      }
    });
  }
  // timeCheck() {
  //   const newDate = new Date();
  //   if (this.endTime.getTime() < newDate.getTime()) {
  //     console.log("======EXAM OVER========");
  //   } else {
  //     console.log("======EXAM TIME=========");
  //   }
  // }
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
    if(remainTimeInSeconds <= 0){
    // if (hours == "00" && minutes == "00" && seconds == "00") {
      // this.setSubmitout();
      const user = JSON.parse(localStorage.getItem("user"));
      const mobile = { mobile: user.mobile };
      // console.log(mobile);
      for (const interval of this.intervals) {
        clearInterval(interval);
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
    //    else if(hours=="23") {
    //    const now = new Date();
    // const currentTime = this.endTime.getTime() - now.getTime();
    // console.log("currentTime", currentTime);
    // if (currentTime < 0) {
    //   this.backToHome();
    // }
    //   // this.setSubmitout();
    //   return;
    // }
  }

  ngOnDestroy() {
    window.onbeforeunload = null;
    for (const interval of this.intervals) {
      clearInterval(interval);
    }
  }
  // getIP() {
  //   console.log('IP Address function called');
  //   this.ip.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip;
  //     console.log(this.ipAddress);
  //   });
  // }
  getExam() {
    this.api.getById("exam", this.examId).subscribe((resp) => {
      this.exam = resp;

      this.examName = resp.exam_name;
      // const pattern =new RegExp('Demo', "i");
      // console.log(pattern);
      // console.log(this.examName)
      // const matches = this.examName.match(/Demo/g);

      // console.log(matches);

      this.endTime = new Date(resp.endTime);
      this.endTime.setHours(this.endTime.getHours() - 5); // Add 5 hours for IST
      this.endTime.setMinutes(this.endTime.getMinutes() - 30); // Add 30 minutes for IST
      // Update the timer every second
      this.intervals.push(
      setInterval(() => {
        this.calculateRemainingTime();
      }, 1000));
      // console.log(resp);

      let examTime = resp.exam_time;
      const currentTime = Date.now();

      // console.log(examTime);
      let start_time = new Date(resp.exam_date);
      let current_time = new Date();
      this.end_time = new Date(resp.exam_date);
console.log("EXAM END TIME++++@+@+@+",this.end_time);
      start_time.setHours(resp.exam_time.split(":")[0]);
      start_time.setMinutes(resp.exam_time.split(":")[1]);
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
      console.log("======>>>>",this.dif);
//       if(this.dif > 0) {
//         console.log("======EXAM OVER========");
//         this.router.navigate(["/dashboard"]);
// }
      this.course_type = resp.course_type;
      this.course_name = resp.course_name;
      this.batch_name = resp.batch_name;
      // if (this.course_type == "Regular") {
      //   this.duration = "60 Mins.";

      // } else {

      // }
      this.duration = "90 Mins.";
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
    this.api.get("exam", query).subscribe((resp) => {
      this.questionList = resp.data.map((o) => {
        o.selectedAnswer = o.userAnswer;
        return o;
      });
      console.log("Questions to display>>>>>>>", resp);
      if (resp.message == "New questions") {
        // this.saveQuestionsInitially();
        console.log(".saveQuestionsInitiallySTOOPED");
      }
      this.startTimer();

      this.questionCount = this.questionList.length;
      this.currentQuestion = this.questionList[0];
      this.notViewed = this.questionCount;
    });
  }

  saveQuestionsInitially() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;
    const uName = user.full_name;

    // console.log(this.ipAddress);

    let quesToSave = [];
    // console.log(this.questionList);
    for (let ques of this.questionList) {
      const data = {
        user_id: uId,
        user_name: uName,
        exam_id: this.examId,
        batch_id: this.exam.batch_id[0],
        exam_name: this.exam.exam_name,
        question_id: ques._id,

        seen: false,
        question: ques.question,
        option_1: ques.option_1,
        option_2: ques.option_2,
        option_3: ques.option_3,
        option_4: ques.option_4,
        marks: ques.marks,
        userAnswer: null,
        status: "unanswered",
        ip_address: this.ipAddress,
      };

      // console.log(data);
      quesToSave.push(data);
    }
    console.log(quesToSave);
    this.api.post("exam/saveQuestions", quesToSave).subscribe((resp: any) => {
      console.log(resp);
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
  // isAnswered(opt: any) {
  //   // console.log("IS SELECTED",opt);

  //   if (this.currentQuestion?.userAnswer == null) {
  //     return false;
  //   } else if (this.currentQuestion.userAnswer == opt) {
  //     return true;
  //   }
  // }
  isSelected(opt: any) {
    // console.log("IS SELECTED",opt);

    if (this.currentQuestion?.selectedAnswer == null) {
      return false;
    } else if (this.currentQuestion.selectedAnswer == opt) {
      return true;
    }
  }
  getAttemptedQuestionCount(): number {
    return this.questionList?.filter(
      (question) => question.status === "answered"
    ).length;
  }
  getNotVisitedQuestionCount(): number {
    console.log(this.questionList?.filter(
      (question) => !question.seen && question.status === "unanswered"
    ));
    return this.questionList?.filter(
      (question) => !question.seen && question.status === "unanswered"
    ).length;
  }
  getViewedQuestionCount(): number {
    return this.questionList?.filter(
      (question) => question.seen && question.status === "unanswered"
    ).length;
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
    this.logAnswer();
    this.syncAnswer();
  }

  previousQuestion() {
    let currentIndex = this.questionList.indexOf(this.currentQuestion);
    let newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      this.currentQuestion = this.questionList[newIndex];
      this.globalIndex = this.globalIndex - 1;
    }
  }
  seenQuestion() {
    return (this.currentQuestion.seen = true);
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

  logAnswer() {
    let user = JSON.parse(localStorage.getItem("user"));

    const data = {
      user_id: user.id,
      user_name: user.full_name,
      exam_id: this.examId,
      exam_name: this.exam?.exam_name,
      question_id: this.currentQuestion?._id,
      status: this.currentQuestion?.status,
      answered: this.currentQuestion?.answered,
      answer: this.currentQuestion?.selectedAnswer,
    };

    this.api.post("activityLog", data).subscribe((resp: any) => {
      // console.log(resp);
    });
  }

  syncAnswer() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uId = user.id;
    const uName = user.full_name;
    const data = {
      user_id: uId,
      user_name: uName,
      exam_id: this.examId,
      exam_name: this.exam.exam_name,
      question_id: this.currentQuestion.question_id || this.currentQuestion._id,
      seen: this.currentQuestion.seen,
      question: this.currentQuestion.question,
      userAnswer: this.currentQuestion.selectedAnswer,
      status: this.currentQuestion.status,
    };
    console.log(data);
    this.api.post("answerSheet", data).subscribe((resp: any) => {
      console.log(resp);
    });
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
          // alert(
          //   "Stop! Your Exam is over. Further Instructions will be sent to you "
          // );

          for (const inte of this.intervals) {
            clearInterval(inte);
          }
          this.userSubmit = true;
          // this.submit();
          this.goBackButton = false;
          // this.examSubmit = true;
          // setTimeout(() => {
          //   this.backToHome();
          // }, 3000);
        }
      }, 1000)
    );
    // this.intervals.push(
    setTimeout(() => {
      // this.setFace();
    }, 1000);
    // );
    // this.intervals.push(
    //   setInterval(() => {
    //     // this.WarnUser();
    //   }, 4000)
    // );
  }

  setSubmitout() {
    confirm("Timeout! Your exam has been submitted successfully.");
    // this.submit();
    this.userSubmit = true;
  }
  submit() {
    this.userSubmit = true;
    // const pattern = new RegExp("Demo", "i");
    // const matches = this.examName.match(pattern);

    // console.log(matches);
    // if (matches == null) {

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
    const user = JSON.parse(localStorage.getItem("user"));
    const mobile = { mobile: user.mobile };
    // console.log(mobile);

    this.api.get("exam/finalExamSubmit", mobile).subscribe((resp: any) => {
      if (resp) {
        console.log("Exam Final submit");
        this.userSubmit = false;
        this.demoExam = false;
        this.submitFinalExam = true;
        this.router.navigate(["/exam/exam-submit"]);
      }
    });
  }
  goBackToHome() {
    this.router.navigate(["/dashboard"]);
  }
}
