import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-result-pdf",
  templateUrl: "./result-pdf.component.html",
  styleUrls: ["./result-pdf.component.scss"],
})
export class ResultPdfComponent implements OnInit {
  examId: any;
  page = 1;
  limit = 1000;
  is_inactive = false;
  resultStatus: any;
  resultList: any;
  passedCount: any;
  failedCount: any;
  result: string;
  cmpName: String = "component1";
  ExamList: any;
  id: any;
  BatchList: any;

  constructor(
    private api: CoreApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: any) => {
      this.examId = params.id;
      this.resultStatus = params.pass;
      console.log("this.examId ", this.examId);
      if (this.examId) {
        this.api.getById("exam", this.examId).subscribe((resp: any) => {
          if (resp) {
            this.ExamList = resp;
            this.id = resp.batch_id[0];
            console.log(this.ExamList);
            this.api.getById("batch", this.id).subscribe((resp: any) => {
              if (resp) {
                this.BatchList = resp;
                console.log(this.BatchList);
              }
            });
          }
        });
      }
      if (this.resultStatus === "2") {
        this.getResultList();
        // this.result = "Qualified";
        console.log(" this.resultStatus", this.result);
      }
      if (this.resultStatus === "1") {
        this.getPassedStudents();
        this.result = "Qualified";
        console.log(" this.resultStatus", this.result);
      }
      if (this.resultStatus === "0") {
        this.getFailedStudents();
        this.result = "Not Qualified";
        console.log(" this.resultStatus", this.result);
      }
    });
    setTimeout(() => {
      this.printComponent(this.cmpName);
    }, 2000);
  }

  ngOnInit(): void {}

  getResultList() {
    this.api
      .get("examReport/getFinalExamReport", { examId: this.examId })
      .subscribe((resp: any) => {
        // console.log(resp);
        if (resp.Reports) {
          this.resultList = resp.Reports;

          console.log("getFinalExamReport>>>>", resp.Reports);
        }
      });
  }

  getPassedStudents() {
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

    this.api
      .get("examReport/getFailedList", { exam_id: this.examId })
      .subscribe((resp: any) => {
        this.resultList = resp.FailedStudentList;
        this.failedCount = resp.TotalCount;
      });
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    // document.body.innerHTML = originalContents;
  }
  printPage() {
    window.print();
  }
}
