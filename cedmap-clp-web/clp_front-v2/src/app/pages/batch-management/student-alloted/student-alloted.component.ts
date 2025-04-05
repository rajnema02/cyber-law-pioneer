import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";
import { CsvDataService } from "src/app/services/csv-data.service";
@Component({
  selector: "app-student-alloted",
  templateUrl: "./student-alloted.component.html",
  styleUrls: ["./student-alloted.component.scss"],
})
export class StudentAllotedComponent implements OnInit {
  id: any;
  BatchList: any;
  env: any;
  page = 1;
  limit = 1000;
  is_inactive = false;
  userList: any;
  listCount: any;

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
  processResultButton: Boolean = true;
  viewParticipationCertificate: Boolean = false;
  certificatesPath: any;
  generateCertificateButton: Boolean = true;
  downloadCertificateButton: Boolean = false;
  uploadCertificateButton: Boolean = false;
  uploadCertificateForm: Boolean = false;
  selectedFiles: FileList | null = null;
  // env: any;
  passPdf: boolean = false;
  failPdf: boolean = false;
  certificationExam: boolean = true;

  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      if (this.id) {
        this.api.getById("batch", this.id).subscribe((resp: any) => {
          this.BatchList = resp;
          this.certificationExam = resp.certificationExam;
          console.log("Batch Info))))>>", this.certificationExam);
        });
      }
    });

    this.env = environment;

    this.getUserList();
  }

  ngOnInit(): void {}

  getUserList() {
    const queryData = {
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
      role: "user",
      is_profileVerified: true,
      batch: this.id,
    };

    this.api.get("user", queryData).subscribe((resp: any) => {
      this.userList = resp.data;

      this.listCount = resp.meta.total;
      console.log("this.userList", this.userList);
    });
  }
  removeFromBatch(id: any) {
    const data = {
      batch: this.id,
    };

    this.api.removeBatch("user", id, data).subscribe((resp: any) => {
      console.log(resp);
    });
  }
  makeAssessor(id: any) {
  if(confirm("Do you want to change this Individual to Assessor")){
    const data = {
      auditType:"Assessor",
    };

    this.api.put("user", id, data).subscribe((resp: any) => {
      console.log(resp);
      this.getUserList()
    });
  }

  }

  exportAsCsv() {
    this.limit = 10000;
    const dataToExport = [];

    for (const user of this.userList) {
      dataToExport.push({
        "Student Name": user.full_name,
        "Reg. Date": user.created_at,
        "Verified Student": user.is_profileVerified,
        District: user.district,
        // "Amount" : user.amount,
        // "Transaction ID" : user.transaction_id,
        // "Amount-2" : user.amount_2,
        // "Transaction ID-2" : user.transaction_id_2,
        // "total_questions" : ard.total_questions,
        // "attempt_questions" : ard.attempt_questions,
        // "correct_questions" : ard.correct_questions,
        // "wrong_questions" : ard.wrong_questions,
      });
    }
    CsvDataService.exportToCsv("result.csv", dataToExport);
  }

  getExamReport() {
    this.viewParticipationCertificate = false;

    this.viewCertificate = false;

    this.showAttendence = false;
    this.clearState = false;
    this.createBatchButton = false;

    this.api
      .post("answerSheet/showStudentsToAdmin", {
        exam_id: this.id,
        batch_id: [this.id],
      })
      .subscribe((resp: any) => {
        // this.getResultList();
        // this.resultList = resp.Answers.concat(resp.AbsentStudents);
        // console.log(this.resultList);
      });
    // this.checkIfReportsAlreadyProcessed();
  }
  checkIfAlreadyGenerated() {
    this.api
      .get("certificate/checkIfGenerated", { examId: this.id })
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
      .get("certificate/download-pdf", {
        exam_id: this.id,
        batch_id: [this.id],
      })
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
      `${this.env.url}/certificate/download-certificates?exam_id=${this.id}`,
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

  checkIfReportsAlreadyProcessed() {
    this.api
      .get("answerSheet/checkIfAlreadyProcessed", { examId: this.id })
      .subscribe((resp: any) => {
        if (resp.success) {
          this.processResultButton = false;
        } else {
        }
      });
  }
}
