import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { log } from "console";
import { CoreApiService } from "src/app/services/core-api.service";

@Component({
  selector: "app-student-message-list",
  templateUrl: "./student-message-list.component.html",
  styleUrls: ["./student-message-list.component.scss"],
})
export class StudentMessageListComponent implements OnInit {
  batchId: any;
  messageList: any;
  messageRes: boolean = false;
  page = 1;
  limit = 20;
  count = 0;
  pageSize = 3;
  newIndex: any = 0;
  listCount: any = 0;
  userId: any;
  messageBatchList: any;
  listBatchCount: any;
  newBatchIndex: any;

  constructor(private api: CoreApiService, private route: ActivatedRoute) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.id;
    // console.log(userId);

    if (this.userId) {
      this.api.getById("user", this.userId).subscribe((resp: any) => {
        if (resp) {
          this.batchId = resp.batch;
          // console.log(this.batchId);
          if (this.batchId) {
            this.getStudentMessages();
            this.getStudentBatchMessages();
          } else {
            this.messageRes = true;
          }
        }
      });
    }
  }

  ngOnInit(): void {
    // this.checkStudentBatch();
  }

  getStudentMessages() {
    const query = {
      page: this.page,
      limit: this.limit,
      student_id: this.userId,
    };
    this.api.get("message/studentMessages", query).subscribe((resp: any) => {
      console.log("MSG_RESPONCE", resp);

      if (resp.data.length > 0) {
        this.messageList = resp.data;
        this.listCount = resp.meta.total;
        // console.log("this.userList", resp);
        // console.log(this.listCount);
        this.newIndex = resp.meta.from;
      } else {
        this.messageRes = true;
      }
    });
  }
  getStudentBatchMessages() {
    const batchQuery = {
      page: this.page,
      limit: this.limit,
      batch_id: this.batchId,
    };
    this.api

      .get("message/studentMessages", batchQuery)
      .subscribe((resp: any) => {
        console.log("MSG_RESPONCE", resp);

        if (resp.data.length > 0) {
          this.messageBatchList = resp.data;
          this.listBatchCount = resp.meta.total;
          // console.log("this.userList", resp);
          // console.log(this.listCount);
          this.newBatchIndex = resp.meta.from;
        } else {
          this.messageRes = true;
        }
      });
  }
}
