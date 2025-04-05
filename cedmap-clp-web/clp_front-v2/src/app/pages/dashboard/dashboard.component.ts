import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
// import Chart from "chart.js";
import { CoreApiService } from "src/app/services/core-api.service";
import { environment } from "src/environments/environment";

import { CsvDataService } from "src/app/services/csv-data.service";
import { Action } from "rxjs/internal/scheduler/Action";

// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "../../variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // public datasets: any;
  // public data: any;
  // public salesChart;
  // public clicked: boolean = true;
  // public clicked1: boolean = false;
  user: any;
  formStatus: any;
  role: any;
  userList: any;
  page = 1;
  limit = 20;
  is_inactive = false;
  currentIndex = -1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  newIndex: any = 0;
  emptySearch = true;

  env: { production: boolean; url: string };
  profile_verify: any;
  formQueries = [
    { formStatus: false },
    { formStatus: true, is_profileVerified: false },
    { formStatus: true, is_profileVerified: true },
    { is_profileRejected: true, is_spam: false },
    { is_spam: true },
  ];
  selectedFormQuery: any;
  full_name: any;
  mobile: any;
  email: any;
  course: any;
  district: any;
  transaction_id: any;
  created_at: Date;
  transaction_at: Date;
  listCount: any = 0;
  messageLimit = 5;
  userMessage: any;
  msgByadmin: any;
  userDetail: any;
  userBatch: any;
  reportList: any;
  ceritificate: any;
  messageBatchList: any;
  responseCode: string;
  userTransaction_id:any;
  constructor(
    private api: CoreApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem("user" || "{}"));
    this.env = environment;
    this.role = this.user.role;
    if (this.role == "admin" || this.role == "super-admin") {
      this.getUserList();
    } else if (this.role == "admin-read") {
      this.getUserList();
    } else if (this.role == "user") {
      this.getUser();
      this.getStudentsCertificates();
    } else if (this.role == "demo-user") {
      this.getUser();
    }


  }

  ngOnInit() {
    this.isEmptySearch();
  }

  getStudentsCertificates() {
    this.api
      .get("examReport/getStudentCertificates", { studentId: this.user.id })
      .subscribe((resp: any) => {
        if (resp.success) {
          this.ceritificate = resp;
          this.reportList = resp.reports;

          console.log(this.reportList);
        } else {
          this.ceritificate = resp;
          // alert(resp.message);
        }
      });
  }
  //   getNewUrl(){
  //     const url = 'https://google.com'; // Replace with your desired URL
  // const windowFeatures = 'menubar=no,toolbar=no,location=no,status=no';

  // window.open(url, '_blank', windowFeatures);
  //   }
  getUser() {
    this.api.getById("user", this.user.id).subscribe((resp: any) => {
      if (resp) {
        this.userDetail = resp;
        console.log(this.userDetail);
        this.userBatch = resp.batch;

        console.log("userBatch", this.userBatch);
        this.formStatus = resp.formStatus;

        this.profile_verify = resp.is_profileVerified;
        this.userTransaction_id = resp.transaction_id;
        console.log("this.userTransaction_id", this.userTransaction_id);
        this.getUserMessage();
        if (this.userBatch) {
          this.getUserAdminMessage();
          this.getStudentBatchMessages();
        }
      }
    });
  }
  getStudentBatchMessages() {
    const batchQuery = {
      page: this.page,
      limit: 1,
      batch_id: this.userBatch,
    };
    this.api

      .get("message/studentMessages", batchQuery)
      .subscribe((resp: any) => {
        console.log("MSG_RESPONCE", resp);

        if (resp.data.length > 0) {
          this.messageBatchList = resp.data;
          // this.listBatchCount = resp.meta.total;
          // // console.log("this.userList", resp);
          // // console.log(this.listCount);
          // this.newBatchIndex = resp.meta.from;
        } else {
          // this.messageRes = true;
        }
      });
  }
  getUserMessage() {
    const messageData = {
      page: this.page,
      limit: this.messageLimit,
      is_inactive: this.is_inactive,
      student_id: this.user.id,
    };
    this.api
      .get("message/studentMessages", messageData)
      .subscribe((resp: any) => {
        if (resp) {
          this.userMessage = resp;
        }
      });
    // this.getUserAdminMessage();
  }

  getUserAdminMessage() {
    console.log("getUserAdminMessage Called", this.userBatch);

    const messageData = {
      page: this.page,
      limit: this.messageLimit,
      is_inactive: this.is_inactive,
      batch_id: this.userBatch,
    };
    this.api
      .get("message/studentMessagesByAdmin", messageData)
      .subscribe((resp: any) => {
        if (resp) {
          this.msgByadmin = resp;
        }
      });
  }
  // Need to be intigrate Afetr complition
  getStudentsExamsList() {}

  getUserList() {
    this.isEmptySearch();

    const queryData = {
      page: this.page,
      limit: this.limit,
      is_inactive: this.is_inactive,
      role: "user",
      ...this.selectedFormQuery,
    };
    if (this.full_name) {
      queryData["full_name"] = this.full_name;
    }
    if (this.email) {
      queryData["email"] = this.email;
    }
    if (this.course) {
      queryData["course_code"] = this.course;
    }
    if (this.mobile) {
      queryData["mobile"] = this.mobile;
    }
    if (this.district) {
      queryData["district"] = this.district;
    }
    if (this.created_at) {
      queryData["created_at"] = this.created_at + "T00:00:00.000Z";
    }
    if (this.transaction_at) {
      queryData["transaction_at"] = this.transaction_at + "T00:00:00.000Z";
    }
    if (this.transaction_id) {
      queryData["transaction_id"] = this.transaction_id;
    }
    this.api.get("user", queryData).subscribe((resp: any) => {
      this.userList = resp.data;
      this.listCount = resp.meta.total;
      // console.log("this.userList", resp);
      // console.log(this.listCount);
      this.newIndex = resp.meta.from;
    });
  }

  clearFilter() {
    this.full_name = "";
    this.email = "";
    this.mobile = "";
    this.transaction_id = "";
    this.getUserList();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getUserList();
  }

  verifyProfile(id: any) {
    // console.log(id);
    if (confirm("Are you sure !!! You want to verify this form")) {
      const queryData = {
        is_profileVerified: true,
      };

      this.api.put("user", id, queryData).subscribe((resp: any) => {
        if (resp) {
          this.getUserList();
        }
      });
    }
  }
  rejectProfile(id: any) {
    // console.log(id);
    if (confirm("Are you sure !!! You want to reject this form")) {
      const queryData = {
        formStatus: false,
      };

      this.api
        .put("user/updateReject", id, queryData)
        .subscribe((resp: any) => {
          if (resp) {
            this.getUserList();
          }
        });
    } else {
    }
  }
  spamProfile(id: any) {
    // console.log(id);
    if (confirm("Are you sure !!! You want to rejectan mark SPAM this form")) {
      const queryData = {
        formStatus: false,
        is_is_profileRejected: true,
        is_spam: true,
      };

      this.api
        .put("user/updateReject", id, queryData)
        .subscribe((resp: any) => {
          if (resp) {
            this.getUserList();
          }
        });
    } else {
    }
  }
  changeIndex() {
    this.newIndex = this.newIndex + 10;
  }

  exportAsCsv() {
    this.limit = 10000;
    const dataToExport = [];
    for (const user of this.userList) {
      dataToExport.push({
        "Applicant Name": user.full_name,
        Mobile: user.mobile,
        Email: user.email,
        District: user.district,
        "Reg. Date": user.created_at,
        Amount: user.amount,
        "Transaction ID": user.transaction_id,
        "Amount-2": user.amount_2,
        "Transaction ID-2": user.transaction_id_2,
        // "total_questions" : ard.total_questions,
        // "attempt_questions" : ard.attempt_questions,
        // "correct_questions" : ard.correct_questions,
        // "wrong_questions" : ard.wrong_questions,
      });
    }
    CsvDataService.exportToCsv("result.csv", dataToExport);
  }

  isEmptySearch() {
    if (this.full_name || this.email || this.transaction_id || this.mobile) {
      this.emptySearch = false;
    } else {
      this.emptySearch = true;
    }
  }
}
