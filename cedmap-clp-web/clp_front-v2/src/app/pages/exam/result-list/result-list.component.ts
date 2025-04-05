import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-result-list",
  templateUrl: "./result-list.component.html",
  styleUrls: ["./result-list.component.scss"],
})
export class ResultListComponent implements OnInit {
  resultList: any = [];
  examId: any;
  duration: any = "--";
  examData: any;
  studentList: any;
  showAttendence: Boolean = false;
  createBatchButton: Boolean = false;
  absentList: any;
  absentShow: Boolean = true;
  clearState: Boolean = false;
  reScheduleExamForm: Boolean = false;
  count: any;
  resultCount: any = "-";
  passedCount: any = "-";
  failedCount: any = "-";
  viewCertificate: Boolean = false;
  processResultButton: Boolean = false;
  viewParticipationCertificate: Boolean = false;
  certificatesPath: any;
  generateCertificateButton: Boolean = true;
  downloadCertificateButton: Boolean = false;
  uploadCertificateButton: Boolean = false;
  uploadCertificateForm: Boolean = false;
  selectedFiles: FileList | null = null;
  env: any;
  passPdf: boolean = false;
  failPdf: boolean = false;

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.env = environment;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.examId = params.id;
    });
    this.api.get(`exam/${this.examId}`, {}).subscribe((resp: any) => {
      console.log(resp);
      this.examData = resp;
      console.log(this.examData);
      const examHour = this.examData.exam_time.split(":")[0];
      const examMinutes = this.examData.exam_time.split(":")[1];
      const examDate = new Date(this.examData.exam_date);
      console.log(examDate);
      examDate.setHours(examHour);
      examDate.setMinutes(examMinutes);
      console.log(examDate);
      const nowTime = new Date();
      // if(nowTime > new Date(examDate.setHours(examDate.getHours()+24)))
      // {
      this.processResultButton = true;
      //   console.log("Processing Time started")
      // }else{
      //   alert('Result Processing time not yet started. Please visit after some time!');
      //   this.router.navigate(["/dashboard"]);

      // }
    });
    this.getResultList();
    this.getTotalCount();
    this.checkIfAlreadyGenerated();
    this.checkIfReportsAlreadyProcessed();
    // this.checkIfAlreadyDownloaded();
    // this.getExamReport();
  }

  checkIfReportsAlreadyProcessed() {
    this.api
      .get("answerSheet/checkIfAlreadyProcessed", { examId: this.examId })
      .subscribe((resp: any) => {
        if (resp.success) {
          this.processResultButton = false;
        } else {
        }
      });
  }
  getTotalCount() {
    this.api
      .get("answerSheet/getTotalCount", { exam_id: this.examId })
      .subscribe((resp: any) => {
        this.count = resp.TotalCount;
      });
  }

  getResultList() {
    this.viewParticipationCertificate = false;

    this.viewCertificate = false;

    this.showAttendence = false;
    this.clearState = false;
    this.createBatchButton = false;
    this.uploadCertificateForm = false;

    console.log("Result list is called!");
    this.api
      .get("examReport/getResultList/", { exam_id: this.examId })
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.ResultList) {
          this.resultList = resp.ResultList;
          this.resultCount = resp.TotalCount;
          this.passedCount = resp.PassedCount;
          this.failedCount = resp.FailedCount;
          console.log("resultList", this.resultList);
        } else {
          if (this.processResultButton == true) {
            alert(resp.message);
          }
        }
      });
  }

  getPassedStudents() {
    this.uploadCertificateForm = false;

    this.viewParticipationCertificate = false;
    this.viewCertificate = true;
    this.clearState = true;
    this.reScheduleExamForm = false;
    this.absentShow = false;
    this.createBatchButton = false;
    this.passPdf = true;
    this.failPdf = false;
    this.showAttendence = false;

    this.api
      .get("examReport/getPassedList", { exam_id: this.examId })
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.PassedStudentList.length < 0) {
          alert("No passed students found!");
        } else {
          this.resultList = resp.PassedStudentList;
          this.passedCount = resp.TotalCount;
        }
      });
  }
  getFailedStudents() {
    this.uploadCertificateForm = false;

    this.viewCertificate = false;
    this.passPdf = false;
    this.failPdf = true;
    this.clearState = true;
    this.reScheduleExamForm = false;

    this.absentShow = true;

    this.api
      .get("exam/checkIfExamIsLastAttempt", { id: this.examId })
      .subscribe((resp: any) => {
        if (resp.success == true) {
          this.createBatchButton = true;
        } else {
          this.viewParticipationCertificate = true;
        }
      });

    this.showAttendence = false;

    this.api
      .get("examReport/getFailedList", { exam_id: this.examId })
      .subscribe((resp: any) => {
        this.resultList = resp.FailedStudentList;
        this.failedCount = resp.TotalCount;
      });
  }

  showAttendenceList() {
    this.viewParticipationCertificate = false;

    this.viewCertificate = false;

    this.clearState = true;
    this.createBatchButton = false;
    this.reScheduleExamForm = false;

    this.api
      .post("answerSheet/showAttendenceList", { exam_id: this.examId })
      .subscribe((resp: any) => {
        this.studentList = resp;
        this.showAttendence = true;
      });
  }

  back() {
    this.reScheduleExamForm = false;
  }
  reScheduleExam() {
    this.viewCertificate = false;

    this.api
      .get("exam/checkIfAlreadyRescheduled", { id: this.examId })
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.success == false) {
          this.clearState = false;

          this.reScheduleExamForm = true;
        } else if (resp.success == true) {
          alert(resp.message);
        }
      });
  }

  getExamReport() {
    this.viewParticipationCertificate = false;

    this.viewCertificate = false;

    this.showAttendence = false;
    this.clearState = false;
    this.createBatchButton = false;

    this.api
      .post("answerSheet/showResultsToAdmin", { exam_id: this.examId })
      .subscribe((resp: any) => {
        this.getResultList();

        // this.resultList = resp.Answers.concat(resp.AbsentStudents);
        // console.log(this.resultList);
      });
    this.checkIfReportsAlreadyProcessed();
  }
  checkIfAlreadyGenerated() {
    this.api
      .get("certificate/checkIfGenerated", { examId: this.examId })
      .subscribe((resp: any) => {
        if (resp.success == true) {
          this.generateCertificateButton = false;
          this.downloadCertificateButton = true;
          this.uploadCertificateButton = true;
        } else {
          console.log(resp.message);
        }
      });
  }
  // checkIfAlreadyDownloaded(){
  //   this.api.get('certificate/checkIfDownloaded', {examId: this.examId}).subscribe((resp: any)=>{
  //     if(resp.success == true){
  //       this.generateCertificateButton = false;
  //       this.downloadCertificateButton = false;
  //       this.uploadCertificateButton = true;

  //     }else{
  //       console.log(resp.message);
  //     }
  //   })
  // }

  generateCertificates() {
    this.api
      .get("certificate/download-pdf", { exam_id: this.examId })
      .subscribe((resp) => {
        if (resp) {
          console.log(resp);
          this.generateCertificateButton = false;
          this.downloadCertificateButton = true;
          this.uploadCertificateButton = true;
          alert("Certificates generated successfully!!");
          // this.certificatesPath = resp.filePath;

          // window.open(`${resp.filePath}`);
        } else {
          alert("No certificates to download!");
        }
      });
  }

  downloadCertificates() {
    window.open(
      `${this.env.url}/certificate/download-certificates?exam_id=${this.examId}`,
      "_blank"
    );
  }
  uploadCertificates() {
    this.uploadCertificateForm = true;
  }
  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (!this.selectedFiles) {
      console.log("No files selected");
      return;
    }

    const formData: FormData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append("files", this.selectedFiles[i]);
    }
    console.log(formData);
    this.api.post("certificate/upload", formData).subscribe((resp: any) => {
      if (resp.success) {
        this.uploadCertificateForm = false;
        this.uploadCertificateButton = false;
        alert("Certificates uploaded successfully!");
        console.log(resp);
      } else {
        alert(resp.message);
      }
    });
  }

  sendPassMessages() {}
  checkDate(dateValue: any) {
    // console.log(dateValue);
    // const todaysDate =new Date;
    // const selectedDate= new Date(dateValue)
    // todaysDate.setDate(todaysDate.getDate()+ 2);
    // if(todaysDate > selectedDate ){
    //   alert('Please select a date which is 3 days later from today!');
    // }
  }

  submit(frm: any) {
    if (!frm.form.invalid) {
      console.log(frm.form.value);
      const newExamData = frm.form.value;
      const exam_id = this.examId;
      const data = {
        newExamData,
        exam_id,
      };

      this.api.post("exam/reScheduleExam", data).subscribe((resp: any) => {
        console.log(resp);
        if (resp.message) {
          alert(resp.message);
          this.reScheduleExamForm = false;
        } else {
          alert("Exam Re-Scheduled Successfully!!");
          this.reScheduleExamForm = false;
        }
      });
    }
    alert("please fill required fields!!");
    return;
  }
}
